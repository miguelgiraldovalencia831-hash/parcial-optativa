import { useState } from "react";

function ApodCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const isVideo = item.media_type === "video";
  // Para los videos, la API entrega una miniatura con el parámetro thumbs=true
  const imageSrc = isVideo ? item.thumbnail_url : item.url;
  const author = item.copyright ? item.copyright.replace(/\n/g, " ").trim() : "NASA";

  return (
    <article className="card">
      <div className="card__imgwrap">
        {imageSrc ? (
          <img className="card__img" src={imageSrc} alt={item.title} loading="lazy" />
        ) : (
          <div className="card__img card__img--empty">Sin vista previa</div>
        )}
        <span className={`card__tag ${isVideo ? "card__tag--video" : ""}`}>
          {isVideo ? "▶ Video" : "Imagen"}
        </span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        <ul className="card__info">
          <li>
            <span>Fecha</span> {item.date}
          </li>
          <li>
            <span>Autor</span> {author}
          </li>
        </ul>

        <p className={`card__desc ${showDetails ? "card__desc--full" : ""}`}>
          {item.explanation}
        </p>

        <div className="card__actions">
          <button className="btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </button>
          <a
            className="btn btn--ghost"
            href={item.hdurl || item.url}
            target="_blank"
            rel="noreferrer"
          >
            {isVideo ? "Ver video" : "Ver HD"}
          </a>
        </div>
      </div>
    </article>
  );
}

export default ApodCard;
