/**
 * Harita çizimi, medeniyet işaretleyicileri ve zaman çizelgesi etkileşimleri.
 * Harita altlığı: güncel dünya sınırları (world-atlas / TopoJSON, CDN üzerinden).
 */
const REGION_COLORS = {
  species: "#f59e0b",
  middle_east: "#dc2626",
  africa: "#16a34a",
  europe: "#2563eb",
  south_asia: "#ea580c",
  east_asia: "#db2777",
  americas: "#7c3aed",
  steppe: "#92400e"
};

const REGION_LABELS = {
  species: "İnsan Türleri",
  middle_east: "Ortadoğu / Mezopotamya",
  africa: "Afrika",
  europe: "Avrupa",
  south_asia: "Güney Asya",
  east_asia: "Doğu Asya",
  americas: "Amerika",
  steppe: "Bozkır / Orta Asya"
};

const WORLD_ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const svg = d3.select("#world-map");
const tooltip = d3.select("#tooltip");
const yearSlider = document.getElementById("year-slider");
const yearDisplay = document.getElementById("year-display");
const eraDisplay = document.getElementById("era-display");
const playBtn = document.getElementById("play-btn");
const activeListEl = document.getElementById("active-list");
const legendListEl = document.getElementById("legend-list");
const eventsLegendEl = document.getElementById("events-legend");
const milestoneBanner = document.getElementById("milestone-banner");

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath(projection);

let landFeatures = null;
let isPlaying = false;
let playTimer = null;

function buildLegend() {
  legendListEl.innerHTML = Object.keys(REGION_COLORS)
    .map(
      (region) => `
        <li>
          <span class="legend-dot" style="background:${REGION_COLORS[region]}"></span>
          ${REGION_LABELS[region]}
        </li>`
    )
    .join("");

  eventsLegendEl.innerHTML = MILESTONE_EVENTS.map(
    (event) => `
      <li>
        <span class="legend-icon">${event.icon}</span>
        ${event.name} (${formatYear(event.year)})
      </li>`
  ).join("");
}

function resizeMap() {
  const panel = svg.node().parentElement;
  const width = panel.clientWidth;
  const height = panel.clientHeight;

  svg.attr("viewBox", `0 0 ${width} ${height}`);
  projection.fitSize([width, height], landFeatures || { type: "Sphere" });

  svg.selectAll(".land-path").attr("d", pathGenerator);
  renderMarkers(getCurrentYear());
  renderEvents(getCurrentYear());
}

function drawBaseMap(topology) {
  landFeatures = topojson.feature(topology, topology.objects.countries);

  svg
    .append("g")
    .attr("class", "land-group")
    .selectAll("path")
    .data(landFeatures.features)
    .join("path")
    .attr("class", "land-path");

  svg.append("g").attr("class", "markers-group");
  svg.append("g").attr("class", "events-group");

  resizeMap();
}

function getCurrentYear() {
  return sliderToYear(Number(yearSlider.value));
}

function civilizationsActiveAt(year) {
  return CIVILIZATIONS.filter((c) => year >= c.start && year <= c.end);
}

function radiusForScale(scale) {
  return 6 + Math.sqrt(scale) * 9;
}

function renderMarkers(year) {
  const active = civilizationsActiveAt(year);
  const markersGroup = svg.select(".markers-group");

  const markers = markersGroup
    .selectAll("circle.marker")
    .data(active, (d) => d.id);

  markers.exit().remove();

  markers
    .enter()
    .append("circle")
    .attr("class", "marker")
    .attr("r", 0)
    .merge(markers)
    .attr("fill", (d) => REGION_COLORS[d.region])
    .attr("cx", (d) => projection([d.lon, d.lat])[0])
    .attr("cy", (d) => projection([d.lon, d.lat])[1])
    .attr("r", (d) => radiusForScale(d.scale))
    .on("mouseenter", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  renderActiveList(active);
}

function renderActiveList(active) {
  if (active.length === 0) {
    activeListEl.innerHTML = `<li class="empty">Bu dönemde tanımlı bir medeniyet yok.</li>`;
    return;
  }

  activeListEl.innerHTML = active
    .map(
      (c) => `
        <li data-id="${c.id}">
          <span class="legend-dot" style="background:${REGION_COLORS[c.region]}"></span>
          <div>
            <strong>${c.name}</strong>
            <div class="active-list-range">${formatYear(c.start)} — ${formatYear(c.end)}</div>
            <div class="active-list-population">Nüfus: ${formatPopulation(c.population)}</div>
          </div>
        </li>`
    )
    .join("");
}

/**
 * Olayın "az önce oldu" gibi vurgulanacağı süre penceresi (yıl).
 * Ne kadar eskiyse tarih belirsizliği de o kadar büyük olduğundan pencere genişletilir.
 */
function highlightWindowFor(event) {
  return Math.max(150, Math.abs(event.year) * 0.05);
}

function renderEvents(year) {
  const occurred = MILESTONE_EVENTS.filter((event) => year >= event.year);
  const eventsGroup = svg.select(".events-group");

  const markers = eventsGroup.selectAll("text.event-marker").data(occurred, (d) => d.id);

  markers.exit().remove();

  markers
    .enter()
    .append("text")
    .attr("class", "event-marker")
    .text((d) => d.icon)
    .on("mouseenter", showEventTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)
    .merge(markers)
    .classed("event-marker--highlight", (d) => year <= d.year + highlightWindowFor(d))
    .attr("x", (d) => projection([d.lon, d.lat])[0])
    .attr("y", (d) => projection([d.lon, d.lat])[1]);
}

function showEventTooltip(event, d) {
  tooltip
    .classed("hidden", false)
    .html(`<strong>${d.icon} ${d.name}</strong><br>${formatYear(d.year)}<br>${d.note}`);
  moveTooltip(event);
}

function showTooltip(event, d) {
  tooltip
    .classed("hidden", false)
    .html(
      `<strong>${d.name}</strong><br>${formatYear(d.start)} — ${formatYear(d.end)}<br>Nüfus: ${formatPopulation(d.population)}<br>${d.note}`
    );
  moveTooltip(event);
}

function moveTooltip(event) {
  const panelRect = svg.node().parentElement.getBoundingClientRect();
  tooltip
    .style("left", `${event.clientX - panelRect.left + 14}px`)
    .style("top", `${event.clientY - panelRect.top + 14}px`);
}

function hideTooltip() {
  tooltip.classed("hidden", true);
}

function onYearChange() {
  const year = getCurrentYear();
  yearDisplay.textContent = formatYear(year);
  updateEraDisplay(year);
  renderMarkers(year);
  renderEvents(year);
}

function updateEraDisplay(year) {
  const era = getEraForYear(year);
  eraDisplay.textContent = era.name;
  eraDisplay.title = era.note;
  updateMilestoneBanner(year);
}

function updateMilestoneBanner(year) {
  const current = MILESTONE_EVENTS.find(
    (event) => year >= event.year && year <= event.year + highlightWindowFor(event)
  );

  if (!current) {
    milestoneBanner.classList.add("hidden");
    return;
  }

  milestoneBanner.classList.remove("hidden");
  milestoneBanner.textContent = `${current.icon} ${current.name} — ${formatYear(current.year)}`;
}

function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? "⏸" : "▶";
  playBtn.setAttribute("aria-label", isPlaying ? "Duraklat" : "Zaman içinde oynat");

  if (isPlaying) {
    playTimer = setInterval(() => {
      const next = Number(yearSlider.value) + 1;
      yearSlider.value = next > 1000 ? 0 : next;
      onYearChange();
    }, 60);
  } else {
    clearInterval(playTimer);
  }
}

function init() {
  buildLegend();
  yearSlider.value = yearToSlider(-300000);
  onYearChange();

  yearSlider.addEventListener("input", onYearChange);
  playBtn.addEventListener("click", togglePlay);
  window.addEventListener("resize", resizeMap);

  d3.json(WORLD_ATLAS_URL)
    .then(drawBaseMap)
    .catch(() => {
      svg.node().parentElement.insertAdjacentHTML(
        "beforeend",
        `<p class="map-error">Harita verisi yüklenemedi. İnternet bağlantınızı kontrol edip sayfayı yenileyin.</p>`
      );
    });
}

init();
