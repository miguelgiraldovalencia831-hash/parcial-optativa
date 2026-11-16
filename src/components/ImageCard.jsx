import { useState } from "react";

function ImageCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="card">
      <div className="card__imgwrap">
        <img className="card__img" src={item.image} alt={item.title} loading="lazy" />
        <span className="card__tag">{item.center}</span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        <ul className="card__info">
          <li>
            <span>Fecha</span> {item.date}
          </li>
          <li>
            <span>Autor</span> {item.author}
          </li>
        </ul>

        <p className={`card__desc ${showDetails ? "card__desc--full" : ""}`}>
          {item.description}
        </p>

        <div className="card__actions">
          <button className="btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </button>
          <a
            className="btn btn--ghost"
            href={`https://images.nasa.gov/details/${encodeURIComponent(item.id)}`}
            target="_blank"
            rel="noreferrer"
          >
            Ver en NASA
          </a>
        </div>
      </div>
    </article>
  );
}

export default ImageCard;
