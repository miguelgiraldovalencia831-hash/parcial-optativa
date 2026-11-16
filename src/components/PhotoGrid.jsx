import PhotoCard from "./PhotoCard";

function PhotoGrid({ photos }) {
  return (
    <section className="grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </section>
  );
}

export default PhotoGrid;
