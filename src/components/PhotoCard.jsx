import { useState } from "react";

function PhotoCard({ photo }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="card">
      <div className="card__imgwrap">
        <img
          className="card__img"
          src={photo.img_src}
          alt={`Marte visto por ${photo.camera.full_name}`}
          loading="lazy"
        />
        <span className="card__tag">{photo.camera.name}</span>
      </div>

      <div className="card__body">
        <h3 className="card__title">{photo.camera.full_name}</h3>
        <ul className="card__info">
          <li>
            <span>Rover</span> {photo.rover.name}
          </li>
          <li>
            <span>Fecha terrestre</span> {photo.earth_date}
          </li>
          <li>
            <span>Sol</span> {photo.sol}
          </li>
        </ul>

        {showDetails && (
          <ul className="card__details">
            <li>
              <span>ID de foto</span> {photo.id}
            </li>
            <li>
              <span>Estado del rover</span>{" "}
              {photo.rover.status === "active" ? "Activo" : "Completado"}
            </li>
            <li>
              <span>Lanzamiento</span> {photo.rover.launch_date}
            </li>
            <li>
              <span>Aterrizaje</span> {photo.rover.landing_date}
            </li>
          </ul>
        )}

        <div className="card__actions">
          <button className="btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </button>
          <a className="btn btn--ghost" href={photo.img_src} target="_blank" rel="noreferrer">
            Ver original
          </a>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard;
