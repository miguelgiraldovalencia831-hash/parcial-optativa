import ImageCard from "./ImageCard";

function ImageGrid({ items }) {
  return (
    <section className="grid">
      {items.map((item) => (
        <ImageCard key={item.id} item={item} />
      ))}
    </section>
  );
}

export default ImageGrid;
