async function renderCards() {
  const grid = document.getElementById("cards");
  if (!grid) return;

  const jsonPath = grid.dataset.json;

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error("No se pudo cargar " + jsonPath);
    }

    const items = await response.json();

    items.forEach((item) => {
      const link = document.createElement("a");
      link.className = "link-card";

      const isDisabled = item.estado === "proximamente";
      link.href = isDisabled ? "#" : item.url;

      if (isDisabled) {
        link.addEventListener("click", (e) => e.preventDefault());
      }

      const card = document.createElement("div");
      card.className = "card" + (isDisabled ? " disabled" : "");

      const title = document.createElement("h2");
      title.textContent = item.titulo;

      const desc = document.createElement("p");
      desc.textContent = item.descripcion;

      card.appendChild(title);
      card.appendChild(desc);
      link.appendChild(card);
      grid.appendChild(link);
    });
  } catch (error) {
    grid.innerHTML = "<p>No se pudo cargar el contenido.</p>";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", renderCards);
