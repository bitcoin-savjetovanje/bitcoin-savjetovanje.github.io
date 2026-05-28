import type { GuideVideo } from "@/content/guides"

export function GuideVideoEmbed({ video }: { video: GuideVideo }) {
  return (
    <section className="guide-video-card" aria-labelledby="guide-video-title">
      <div className="guide-video-card__copy">
        <h2 id="guide-video-title">Izvorni razgovor</h2>
        {video.caption ? <p>{video.caption}</p> : null}
      </div>
      <div className="guide-video-card__frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a
        href={video.sourceUrl}
        className="guide-video-card__source"
        target="_blank"
        rel="noopener noreferrer"
      >
        Otvorite izvorni razgovor na YouTubeu
      </a>
    </section>
  )
}
