# Cosmos Explorer 🚀

**Nombre del estudiante:** Miguel Giraldo Valencia

**API asignada:** NASA API – imágenes e información espacial (`https://api.nasa.gov/`)

**Endpoint utilizado:** NASA Image and Video Library (servicio de la NASA listado en api.nasa.gov)

```
https://images-api.nasa.gov/search?q={tema}&media_type=image&page={pagina}&page_size=24
```

> Nota: el endpoint de ejemplo del enunciado (`/mars-photos/...`) devuelve error 404 y el servicio APOD no respondía a tiempo, por lo que se utilizó otro servicio de la misma NASA API. No requiere clave.

## Descripción de la aplicación

Cosmos Explorer es una galería astronómica dinámica creada con React + Vite. Consume en tiempo real la API de la NASA y muestra imágenes del archivo oficial según el tema elegido (nebulosas, galaxias, Marte, la Luna, Júpiter, Saturno, misiones Apolo o telescopio Hubble). El diseño usa una paleta de espacio profundo (azules y violetas sobre fondo oscuro).

## Componentes desarrollados

```
App
├── Header      → título y descripción
├── Controls    → tema, orden, paginación y contador
│   └── SearchBar → barra de búsqueda
├── Loader      → indicador de carga
├── ImageGrid   → recorre los resultados con .map()
│   └── ImageCard → tarjeta individual con detalles desplegables
└── Footer
```

## Datos utilizados de la API

- Imagen (`links[0].href`)
- Título (`data[0].title`)
- Fecha (`data[0].date_created`)
- Autor (`data[0].photographer`, o el centro de la NASA si no viene)
- Centro de la NASA (`data[0].center`)
- Descripción (`data[0].description`)
- Identificador (`data[0].nasa_id`) para enlazar a la ficha original

## Funcionalidad de búsqueda o filtro

- Selector de tema: cada tema hace una nueva petición a la API con el parámetro `q`.
- Barra de búsqueda que filtra los resultados por título o descripción.

## Funcionalidad adicional implementada

- **Ver detalles / Ocultar detalles** en cada tarjeta (muestra la descripción completa, con `useState`).
- **Ordenar resultados** por fecha (más reciente o más antigua) o por título.
- **Contador de resultados** ("Mostrando X de Y resultados").
- **Limpiar filtros**.
- **Paginación** (anterior / siguiente) que pide otra página a la API.

## Conceptos aplicados

- React + Vite, componentes y `props`
- `fetch()` dentro de `useEffect()` y datos en `useState()`
- Renderizado dinámico con `.map()`
- Estado de carga y manejo de errores (incluye tiempo límite de espera)
- CSS propio: `background`, `color`, `padding`, `margin`, `border`, `border-radius`, `box-shadow`, `:hover`, `display: grid` / `flex` y `@media` (computador, tablet y celular)

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

No se necesita archivo `.env` ni clave de API.
