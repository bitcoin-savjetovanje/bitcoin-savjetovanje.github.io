from io import BytesIO
from pathlib import Path
import shutil
import subprocess
import tempfile

from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PDF = ROOT / "public" / "downloads" / "sample-osobni-bitcoin-standard.pdf"
OUTPUT_PDF = ROOT / "output" / "pdf" / "sample-osobni-bitcoin-standard.pdf"
PUBLIC_PREVIEW = (
    ROOT
    / "public"
    / "images"
    / "sample-standard"
    / "ogledni-standard-sigurnost.webp"
)

PAGE_INDEX = 12
FONT_NAME = "Arial"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
BODY_COLOR = HexColor("#6E706E")
REPLACED_MCIDS = {16, 17, 18}


def strip_previous_body(page, pdf) -> None:
    """Remove the old body text and any prior generated replacement text."""

    content = ContentStream(page.get_contents(), pdf)
    without_old_body = []
    skipped_marked_content_depth = 0

    for operands, operator in content.operations:
        if skipped_marked_content_depth:
            if operator in (b"BDC", b"BMC"):
                skipped_marked_content_depth += 1
            elif operator == b"EMC":
                skipped_marked_content_depth -= 1
            continue

        if operator == b"BDC" and len(operands) > 1:
            properties = operands[1]
            if getattr(properties, "get", None) and properties.get("/MCID") in REPLACED_MCIDS:
                skipped_marked_content_depth = 1
                continue

        without_old_body.append((operands, operator))

    # If the script is run again, remove the prior replacement's three text
    # objects before adding the fresh overlay. This keeps extracted text clean.
    cleaned = []
    index = 0
    while index < len(without_old_body):
        operands, operator = without_old_body[index]
        if operator != b"BT":
            cleaned.append((operands, operator))
            index += 1
            continue

        end = index
        text_object = []
        while end < len(without_old_body):
            text_object.append(without_old_body[end])
            if without_old_body[end][1] == b"ET":
                break
            end += 1

        serialized = repr(text_object)
        is_generated_replacement = any(
            marker in serialized
            for marker in (
                "wallet backup datoteke",
                "passphraseove",
                "kombinaciju podataka koja omogu",
            )
        )
        if not is_generated_replacement:
            cleaned.extend(text_object)
        index = end + 1

    content.operations = cleaned
    page.replace_contents(content)


def make_overlay(page_width: float, page_height: float) -> PdfReader:
    pdfmetrics.registerFont(TTFont(FONT_NAME, str(FONT_PATH)))

    buffer = BytesIO()
    overlay = canvas.Canvas(buffer, pagesize=(page_width, page_height))

    # Replace only the safety-copy body in the lower-left table cell. The
    # original heading and table rules remain untouched.
    overlay.setFillColor(HexColor("#FFFFFF"))
    overlay.rect(55.0, page_height - 320.0, 227.0, 40.5, fill=1, stroke=0)

    lines = (
        "Ne sadrži privatne ključeve, wallet backup datoteke,",
        "passphraseove, početne riječi drugih walleta, PIN-ove",
        "ni kombinaciju podataka koja omogućuje potpis.",
    )
    overlay.setFillColor(BODY_COLOR)
    overlay.setFont(FONT_NAME, 9)
    baseline = page_height - 290.6
    for line in lines:
        overlay.drawString(57.2, baseline, line)
        baseline -= 12.2

    overlay.save()
    buffer.seek(0)
    return PdfReader(buffer)


def update_pdf() -> None:
    reader = PdfReader(BytesIO(PUBLIC_PDF.read_bytes()))
    writer = PdfWriter(clone_from=reader)
    page = writer.pages[PAGE_INDEX]
    page_width = float(page.mediabox.width)
    page_height = float(page.mediabox.height)
    strip_previous_body(page, writer)
    overlay = make_overlay(page_width, page_height)

    page.merge_page(overlay.pages[0])

    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PDF.open("wb") as output_file:
        writer.write(output_file)

    shutil.copyfile(OUTPUT_PDF, PUBLIC_PDF)


def render_preview() -> None:
    pdftoppm = shutil.which("pdftoppm")
    if not pdftoppm:
        raise RuntimeError("pdftoppm nije dostupan; pregled nije regeneriran.")

    PUBLIC_PREVIEW.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="bitcoin-standard-preview-") as temp_dir:
        preview_stem = Path(temp_dir) / "security"
        subprocess.run(
            [
                pdftoppm,
                "-f",
                str(PAGE_INDEX + 1),
                "-l",
                str(PAGE_INDEX + 1),
                "-singlefile",
                "-r",
                "144",
                "-png",
                str(OUTPUT_PDF),
                str(preview_stem),
            ],
            check=True,
        )
        with Image.open(preview_stem.with_suffix(".png")) as preview:
            preview.convert("RGB").save(
                PUBLIC_PREVIEW,
                "WEBP",
                quality=88,
                method=6,
            )


def main() -> None:
    update_pdf()
    render_preview()
    print(f"Ažuriran PDF: {OUTPUT_PDF}")
    print(f"Ažurirana javna kopija: {PUBLIC_PDF}")
    print(f"Ažuriran pregled: {PUBLIC_PREVIEW}")


if __name__ == "__main__":
    main()
