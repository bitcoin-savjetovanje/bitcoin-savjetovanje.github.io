from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = (
    ROOT / "output" / "pdf" / "ogledni-sazetak-bitcoin-briefinga-za-upravu.pdf"
)
PUBLIC_PATH = (
    ROOT
    / "public"
    / "downloads"
    / "ogledni-sazetak-bitcoin-briefinga-za-upravu.pdf"
)

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 54
TOP = PAGE_HEIGHT - 52
BOTTOM = 48

INK = HexColor("#171612")
INK_SOFT = HexColor("#51493E")
MUTED = HexColor("#746B5D")
PAPER = HexColor("#FFFDF8")
LIMESTONE = HexColor("#F2E9DC")
FOREST = HexColor("#213F31")
CLAY = HexColor("#A96B45")
LINE = HexColor("#D9CCB9")
OLIVE_SOFT = HexColor("#EEF1E7")

FONT_REGULAR = "Arial"
FONT_BOLD = "Arial-Bold"


def register_fonts():
    pdfmetrics.registerFont(
        TTFont(FONT_REGULAR, "/System/Library/Fonts/Supplemental/Arial.ttf")
    )
    pdfmetrics.registerFont(
        TTFont(FONT_BOLD, "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    )


def split_lines(text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
            continue

        if current:
            lines.append(current)
        current = word

    if current:
        lines.append(current)

    return lines


def draw_wrapped(
    pdf,
    text,
    x,
    y,
    max_width,
    font_name=FONT_REGULAR,
    font_size=10,
    color=INK_SOFT,
    leading=14,
):
    pdf.setFont(font_name, font_size)
    pdf.setFillColor(color)
    for line in split_lines(text, font_name, font_size, max_width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_page_background(pdf, page_number, section):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    pdf.setFillColor(FOREST)
    pdf.rect(0, PAGE_HEIGHT - 9, PAGE_WIDTH, 9, fill=1, stroke=0)

    pdf.setFont(FONT_BOLD, 7)
    pdf.setFillColor(CLARITY_WHITE)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 33, "BITCOIN SAVJETOVANJE")
    pdf.drawRightString(
        PAGE_WIDTH - MARGIN_X, PAGE_HEIGHT - 33, f"{page_number:02d} / 04"
    )

    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.6)
    pdf.line(MARGIN_X, BOTTOM - 3, PAGE_WIDTH - MARGIN_X, BOTTOM - 3)
    pdf.setFillColor(MUTED)
    pdf.setFont(FONT_REGULAR, 7)
    pdf.drawString(MARGIN_X, BOTTOM - 18, section)
    pdf.drawRightString(
        PAGE_WIDTH - MARGIN_X,
        BOTTOM - 18,
        "Izmišljeni primjer · bitcoin-savjetovanje.com",
    )


def draw_sample_label(pdf, y):
    label = "IZMIŠLJENI OGLEDNI PRIMJER"
    width = pdfmetrics.stringWidth(label, FONT_BOLD, 8) + 18
    pdf.setFillColor(CLAY)
    pdf.rect(MARGIN_X, y - 13, width, 22, fill=1, stroke=0)
    pdf.setFillColor(CLARITY_WHITE)
    pdf.setFont(FONT_BOLD, 8)
    pdf.drawString(MARGIN_X + 9, y - 5, label)
    return y - 37


def draw_title(pdf, eyebrow, title, y=TOP - 20):
    pdf.setFillColor(CLAY)
    pdf.setFont(FONT_BOLD, 8)
    pdf.drawString(MARGIN_X, y, eyebrow.upper())
    y -= 30
    y = draw_wrapped(
        pdf,
        title,
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
        FONT_BOLD,
        24,
        INK,
        28,
    )
    return y - 14


def draw_panel(pdf, x, y, width, title, body, fill=LIMESTONE):
    title_lines = split_lines(title, FONT_BOLD, 10, width - 26)
    body_lines = split_lines(body, FONT_REGULAR, 8.6, width - 26)
    height = 22 + len(title_lines) * 13 + len(body_lines) * 12 + 15

    pdf.setFillColor(fill)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.6)
    pdf.rect(x, y - height, width, height, fill=1, stroke=1)

    cursor = y - 18
    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 10)
    for line in title_lines:
        pdf.drawString(x + 13, cursor, line)
        cursor -= 13

    cursor -= 3
    pdf.setFillColor(INK_SOFT)
    pdf.setFont(FONT_REGULAR, 8.6)
    for line in body_lines:
        pdf.drawString(x + 13, cursor, line)
        cursor -= 12

    return y - height


def draw_bullets(pdf, items, x, y, width, font_size=9.2, leading=13):
    for item in items:
        pdf.setFillColor(CLAY)
        pdf.circle(x + 2.5, y - 3.2, 2.3, fill=1, stroke=0)
        y = draw_wrapped(
            pdf,
            item,
            x + 14,
            y,
            width - 14,
            FONT_REGULAR,
            font_size,
            INK_SOFT,
            leading,
        )
        y -= 7
    return y


def create_pdf(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    pdf.setTitle("Ogledni sažetak Bitcoin briefinga za upravu")
    pdf.setAuthor("Bitcoin Savjetovanje")
    pdf.setSubject("Izmišljeni ogledni primjer poslovnog sažetka")

    # 1. Naslovnica
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    pdf.setFillColor(FOREST)
    pdf.rect(0, PAGE_HEIGHT - 160, PAGE_WIDTH, 160, fill=1, stroke=0)
    pdf.setFillColor(CLARITY_WHITE)
    pdf.setFont(FONT_BOLD, 9)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 55, "BITCOIN SAVJETOVANJE")
    pdf.setFillColor(CLARITY_WHITE)
    pdf.setFont(FONT_REGULAR, 8)
    pdf.drawString(MARGIN_X, PAGE_HEIGHT - 82, "OGLEDNI DOKUMENT ZA UPRAVU")

    y = PAGE_HEIGHT - 220
    y = draw_sample_label(pdf, y)
    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 29)
    for line in [
        "Sažetak Bitcoin",
        "briefinga za upravu",
    ]:
        pdf.drawString(MARGIN_X, y, line)
        y -= 34

    y -= 12
    y = draw_wrapped(
        pdf,
        "Primjer d.o.o. (izmišljena tvrtka) · primjer radnog rezultata nakon pripremljenog briefinga",
        MARGIN_X,
        y,
        380,
        FONT_REGULAR,
        12,
        INK_SOFT,
        18,
    )

    y -= 44
    panel_width = PAGE_WIDTH - 2 * MARGIN_X
    y = draw_panel(
        pdf,
        MARGIN_X,
        y,
        panel_width,
        "Svrha dokumenta",
        "Sažeti poslovni povod, razjašnjene teme, otvorene odluke, odgovorne uloge i organizacijski sljedeći korak. Dokument je namijenjen internom dijeljenju s upravom, financijama i vanjskim stručnjacima.",
        OLIVE_SOFT,
    )

    y -= 20
    pdf.setFont(FONT_BOLD, 8)
    pdf.setFillColor(CLARITY_WHITE)
    pdf.rect(MARGIN_X, y - 35, panel_width, 35, fill=0, stroke=0)
    pdf.setFillColor(MUTED)
    pdf.drawString(
        MARGIN_X,
        y,
        "4 STRANICE · BEZ PODATAKA STVARNE TVRTKE · EDUKACIJSKI I ORGANIZACIJSKI OKVIR",
    )

    pdf.setStrokeColor(LINE)
    pdf.line(MARGIN_X, BOTTOM + 10, PAGE_WIDTH - MARGIN_X, BOTTOM + 10)
    pdf.setFont(FONT_REGULAR, 7.5)
    pdf.setFillColor(MUTED)
    pdf.drawString(
        MARGIN_X,
        BOTTOM - 5,
        "Nije pravno, porezno, računovodstveno, investicijsko ni regulirano savjetovanje o kriptoimovini.",
    )
    pdf.showPage()

    # 2. Poslovna situacija
    draw_page_background(pdf, 2, "POSLOVNA SITUACIJA I OTVORENE ODLUKE")
    y = draw_sample_label(pdf, TOP - 12)
    y = draw_title(
        pdf,
        "Poslovni povod",
        "Klijent je pitao može li platiti Bitcoinom",
        y,
    )
    y = draw_wrapped(
        pdf,
        "Direktor želi pripremiti jasan odgovor klijentu. Tvrtka još nije odlučila hoće li prihvatiti Bitcoin plaćanja, tko bi bio pružatelj usluge ni bi li se primljeni Bitcoin automatski pretvarao u eure. Ne razmatra se kupnja Bitcoina za bilancu.",
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
        FONT_REGULAR,
        10.2,
        INK_SOFT,
        15,
    )
    y -= 25

    column_gap = 14
    column_width = (PAGE_WIDTH - 2 * MARGIN_X - column_gap) / 2
    left_y = draw_panel(
        pdf,
        MARGIN_X,
        y,
        column_width,
        "Što je razjašnjeno",
        "Plaćanje klijenta, držanje poslovnog novca i kupnja Bitcoina tri su različita pitanja. Svako ima drugačiji tok odobrenja, evidencije, sigurnosti i vanjskih stručnjaka.",
    )
    right_y = draw_panel(
        pdf,
        MARGIN_X + column_width + column_gap,
        y,
        column_width,
        "Što nije odlučeno",
        "Nije izabran pružatelj, model konverzije, računovodstveni tretman ni interni postupak. Briefing nije donio nalog o kupnji, prodaji ili alokaciji.",
        OLIVE_SOFT,
    )
    y = min(left_y, right_y) - 28

    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 13)
    pdf.drawString(MARGIN_X, y, "Otvorene odluke")
    y -= 22
    y = draw_bullets(
        pdf,
        [
            "Ima li prihvat Bitcoin plaćanja stvaran poslovni smisao ili je dovoljan jasan odgovor klijentu?",
            "Želi li tvrtka automatsku konverziju u eure ili bi uopće razmatrala držanje primljenog Bitcoina?",
            "Koje interno tijelo odobrava pilot i tko nadzire provedbu?",
            "Koja pravna, porezna i računovodstvena mišljenja moraju biti pribavljena prije izbora pružatelja?",
            "Koji su kriteriji za provjeru ovlaštenja, usluga, sigurnosti i poslovnog kontinuiteta pružatelja?",
        ],
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
    )
    pdf.showPage()

    # 3. Mapa odgovornosti
    draw_page_background(pdf, 3, "MAPA ODLUKA I ODGOVORNOSTI")
    y = draw_sample_label(pdf, TOP - 12)
    y = draw_title(
        pdf,
        "Mapa odgovornosti",
        "Svako pitanje dobiva vlasnika i sljedeću provjeru",
        y,
    )

    responsibility_rows = [
        (
            "Uprava",
            "Definira svrhu, dopušteni opseg pilota, granice rizika i kriterije prekida.",
        ),
        (
            "Financije",
            "Mapiraju tok naplate, konverziju, evidenciju, usklađenje i odnos prema bliskim obvezama.",
        ),
        (
            "Pravnik i porezni stručnjak",
            "Daju mišljenje o konkretnom modelu, ugovorima, obvezama i poreznom tretmanu.",
        ),
        (
            "Računovođa ili revizor",
            "Potvrđuje način evidentiranja, kontrole i potrebnu dokumentaciju.",
        ),
        (
            "Sigurnost i informatika",
            "Procjenjuju pristupe, ovlasti, kontinuitet, dobavljački rizik i odgovor na incident.",
        ),
        (
            "Ovlašteni pružatelj",
            "Objašnjava dopuštene usluge, operativni tok, naknade, skrbništvo i odgovornosti iz ugovora.",
        ),
    ]

    for index, (role, body) in enumerate(responsibility_rows, start=1):
        pdf.setStrokeColor(LINE)
        pdf.line(MARGIN_X, y + 9, PAGE_WIDTH - MARGIN_X, y + 9)
        pdf.setFillColor(CLAY)
        pdf.setFont(FONT_BOLD, 8)
        pdf.drawString(MARGIN_X, y - 6, f"{index:02d}")
        pdf.setFillColor(INK)
        pdf.setFont(FONT_BOLD, 10)
        pdf.drawString(MARGIN_X + 32, y - 6, role)
        y = draw_wrapped(
            pdf,
            body,
            MARGIN_X + 205,
            y - 6,
            PAGE_WIDTH - MARGIN_X - (MARGIN_X + 205),
            FONT_REGULAR,
            8.8,
            INK_SOFT,
            12,
        )
        y -= 13

    pdf.setStrokeColor(LINE)
    pdf.line(MARGIN_X, y + 9, PAGE_WIDTH - MARGIN_X, y + 9)
    y -= 22
    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 13)
    pdf.drawString(MARGIN_X, y, "Pitanja koja idu vanjskim stručnjacima")
    y -= 21
    draw_bullets(
        pdf,
        [
            "Koji pravni i ugovorni model odgovara stvarnom načinu naplate?",
            "Kako se evidentiraju primitak, konverzija, naknade i moguća razlika u vrijednosti?",
            "Koje ovlaštenje pružatelj mora imati baš za uslugu koju tvrtka treba?",
            "Koje sigurnosne i kontinuitetne obveze ostaju na tvrtki?",
        ],
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
        9,
        13,
    )
    pdf.showPage()

    # 4. Sljedeći korak i granice
    draw_page_background(pdf, 4, "ORGANIZACIJSKI SLJEDEĆI KORAK I GRANICE")
    y = draw_sample_label(pdf, TOP - 12)
    y = draw_title(
        pdf,
        "Zaključak primjera",
        "Prvo pribaviti mišljenja, zatim odlučiti postoji li pilot",
        y,
    )

    y = draw_panel(
        pdf,
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
        "Preporučeni organizacijski sljedeći korak",
        "Financije će u jednom dokumentu opisati željeni tok naplate i konverzije. Pravnik, porezni stručnjak i računovođa provjerit će taj konkretan tok. Tek nakon njihovih mišljenja uprava odlučuje postoji li razlog za ograničeni pilot i pokreće provjeru ovlaštenih pružatelja.",
        OLIVE_SOFT,
    )
    y -= 26

    pdf.setFillColor(INK)
    pdf.setFont(FONT_BOLD, 13)
    pdf.drawString(MARGIN_X, y, "Što se u ovom primjeru ne radi")
    y -= 22
    y = draw_bullets(
        pdf,
        [
            "Ne kupuje se Bitcoin za bilancu i ne određuje se postotak poslovne imovine.",
            "Ne otvara se račun kod pružatelja prije stručne i dobavljačke provjere.",
            "Ne šalju se sredstva, pristupi, privatni ključevi, wallet backup datoteke, wallet passphraseovi, početne riječi drugih walleta ni interni dokumenti Bitcoin Savjetovanju.",
            "Bitcoin Savjetovanje ne daje pravno, porezno ni računovodstveno mišljenje i ne izvršava transakcije.",
        ],
        MARGIN_X,
        y,
        PAGE_WIDTH - 2 * MARGIN_X,
    )
    y -= 16

    pdf.setFillColor(FOREST)
    pdf.rect(MARGIN_X, y - 125, PAGE_WIDTH - 2 * MARGIN_X, 125, fill=1, stroke=0)
    pdf.setFillColor(CLARITY_WHITE)
    pdf.setFont(FONT_BOLD, 11)
    pdf.drawString(MARGIN_X + 18, y - 24, "Granice oglednog dokumenta")
    draw_wrapped(
        pdf,
        "Ovaj izmišljeni primjer prikazuje moguću strukturu sažetka nakon briefinga. Ne određuje regulatornu klasifikaciju usluge i nije mišljenje za konkretnu tvrtku. Stvarni pravni tekst, dnevni red i opseg rada trebaju pregled hrvatskog pravnika koji poznaje MiCA-u.",
        MARGIN_X + 18,
        y - 48,
        PAGE_WIDTH - 2 * MARGIN_X - 36,
        FONT_REGULAR,
        9,
        CLARITY_WHITE,
        13,
    )

    pdf.save()


CLARITY_WHITE = HexColor("#FFFDF8")


if __name__ == "__main__":
    register_fonts()
    create_pdf(OUTPUT_PATH)
    PUBLIC_PATH.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_PATH.write_bytes(OUTPUT_PATH.read_bytes())
    print(OUTPUT_PATH)
    print(PUBLIC_PATH)
