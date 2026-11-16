import { useEffect, useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import ImageGrid from "./components/ImageGrid";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

const BASE_URL = "https://images-api.nasa.gov/search";
const PAGE_SIZE = 24;

function App() {
  // Estado de la petición a la API
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parámetros que disparan una nueva petición
  const [topic, setTopic] = useState("nebula");
  const [page, setPage] = useState(1);

  // Filtros locales (no requieren nueva petición)
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Petición a la API (al cargar y cada vez que cambian tema o página)
  useEffect(() => {
    const controller = new AbortController();
    // Si la API tarda demasiado, se cancela la petición y se muestra un mensaje
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    async function loadImages() {
      setLoading(true);
      setError(null);
      try {
        const url = `${BASE_URL}?q=${encodeURIComponent(topic)}&media_type=image&page=${page}&page_size=${PAGE_SIZE}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Error ${response.status} al consultar la API de la NASA.`);
        }
        const data = await response.json();

        // Se toman solo los campos necesarios de cada resultado de la API
        const results = data.collection.items
          .filter((item) => item.data?.[0] && item.links?.[0])
          .map((item) => {
            const info = item.data[0];
            return {
              id: info.nasa_id,
              title: info.title,
              date: (info.date_created || "").slice(0, 10),
              description: (info.description || "Sin descripción disponible.").replace(/<[^>]*>/g, ""),
              author: info.photographer || info.secondary_creator || info.center || "NASA",
              center: info.center || "NASA",
              image: item.links[0].href,
            };
          });
        setItems(results);
      } catch (err) {
        if (timedOut) {
          setError("La API de la NASA tardó demasiado en responder. Intenta de nuevo en unos minutos.");
          setItems([]);
        } else if (err.name !== "AbortError") {
          setError(err.message);
          setItems([]);
        }
      } finally {
        clearTimeout(timer);
        if (!controller.signal.aborted || timedOut) setLoading(false);
      }
    }

    loadImages();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [topic, page]);

  // Filtrado + ordenamiento
  const term = search.trim().toLowerCase();
  const visibleItems = items
    .filter(
      (i) =>
        term === "" ||
        i.title.toLowerCase().includes(term) ||
        i.description.toLowerCase().includes(term)
    )
    .sort((a, b) => {
      if (sortOrder === "date-desc") return b.date.localeCompare(a.date);
      if (sortOrder === "date-asc") return a.date.localeCompare(b.date);
      if (sortOrder === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const changeTopic = (newTopic) => {
    setTopic(newTopic);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSortOrder("default");
  };

  const hasFilters = search !== "" || sortOrder !== "default";

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Controls
          topic={topic}
          onTopicChange={changeTopic}
          page={page}
          onPageChange={setPage}
          search={search}
          onSearchChange={setSearch}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClear={clearFilters}
          hasFilters={hasFilters}
          loading={loading}
          total={items.length}
          shown={visibleItems.length}
        />

        {loading && <Loader />}
        {error && <p className="message message--error">⚠️ {error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="message">La API no devolvió resultados para este tema.</p>
        )}
        {!loading && !error && items.length > 0 && visibleItems.length === 0 && (
          <p className="message">Ningún resultado coincide con la búsqueda.</p>
        )}
        {!loading && !error && <ImageGrid items={visibleItems} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
