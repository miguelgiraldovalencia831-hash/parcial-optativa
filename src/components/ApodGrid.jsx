import ApodCard from "./ApodCard";

function ApodGrid({ items }) {
  return (
    <section className="grid">
      {items.map((item) => (
        <ApodCard key={`${item.date}-${item.title}`} item={item} />
      ))}
    </section>
  );
}

export default ApodGrid;
