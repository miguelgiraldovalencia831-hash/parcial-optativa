function Header() {
  return (
    <header className="header">
      <div className="header__stars" aria-hidden="true" />
      <div className="container header__content">
        <p className="header__badge">🚀 NASA Open APIs · Image Library</p>
        <h1 className="header__title">Cosmos Explorer</h1>
        <p className="header__subtitle">
          Una galería del universo con las imágenes del archivo oficial de la NASA: nebulosas,
          galaxias, planetas y misiones espaciales.
        </p>
      </div>
    </header>
  );
}

export default Header;
