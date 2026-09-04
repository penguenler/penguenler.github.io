/**
 * Zaman çizelgesi eşlemesi.
 * Kaydırıcı (0-1000) doğrusal olsa da insanlık tarihinin büyük kısmı
 * (~300.000 yıl) çok uzun, yakın tarih ise çok kısa bir süreyi kapsıyor.
 * Bu yüzden kaydırıcı pozisyonunu yıla parça parça doğrusal (piecewise linear)
 * olarak eşliyoruz: eski dönemlere az yer, yakın tarihe daha çok yer veriyoruz.
 */
const TIMELINE_ANCHORS = [
  { pos: 0, year: -300000 },   // Homo sapiens'in ortaya çıkışı
  { pos: 100, year: -50000 },  // Afrika dışına göçler
  { pos: 200, year: -10000 },  // Son buzul çağının sonu / Göbekli Tepe
  { pos: 320, year: -3000 },   // Tunç Çağı, ilk şehir devletleri
  { pos: 450, year: -500 },    // Antik Çağ
  { pos: 550, year: 500 },     // Roma'nın çöküşü / Orta Çağ başlangıcı
  { pos: 650, year: 1000 },
  { pos: 780, year: 1500 },
  { pos: 880, year: 1800 },
  { pos: 1000, year: 2025 }    // Günümüz
];

/** Kaydırıcı pozisyonunu (0-1000) yıla çevirir. */
function sliderToYear(pos) {
  const anchors = TIMELINE_ANCHORS;
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (pos >= a.pos && pos <= b.pos) {
      const t = (pos - a.pos) / (b.pos - a.pos);
      return Math.round(a.year + t * (b.year - a.year));
    }
  }
  return anchors[anchors.length - 1].year;
}

/** Bir yılı en yakın kaydırıcı pozisyonuna (0-1000) çevirir. */
function yearToSlider(year) {
  const anchors = TIMELINE_ANCHORS;
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (year >= a.year && year <= b.year) {
      const t = (year - a.year) / (b.year - a.year);
      return Math.round(a.pos + t * (b.pos - a.pos));
    }
  }
  return year < anchors[0].year ? anchors[0].pos : anchors[anchors.length - 1].pos;
}

/** Yılı "MÖ 10.000" veya "MS 1453" gibi okunabilir Türkçe metne çevirir. */
function formatYear(year) {
  const abs = Math.abs(year).toLocaleString("tr-TR");
  return year <= 0 ? `MÖ ${abs}` : `MS ${abs}`;
}

/**
 * Arkeolojik/tarihi çağlar. Sıralı ve birbirini kesmeyen aralıklardır,
 * kaydırıcının hangi döneme denk geldiğini göstermek için kullanılır.
 */
const ERAS = [
  { name: "Paleolitik Çağ", start: -300000, end: -10000, note: "Eski Taş Devri: avcı-toplayıcı yaşam, ilk taş aletler ve ateş." },
  { name: "Mezolitik Çağ", start: -10000, end: -8000, note: "Orta Taş Devri: buzul çağı sonrası geçiş dönemi." },
  { name: "Neolitik Çağ", start: -8000, end: -3300, note: "Cilalı Taş Devri: tarım, hayvancılık ve yerleşik köy yaşamı." },
  { name: "Tunç Çağı", start: -3300, end: -1200, note: "Bronz aletler, ilk şehir devletleri ve yazının yayılması." },
  { name: "Demir Çağı", start: -1200, end: -550, note: "Demir işçiliği ve büyük bölgesel imparatorlukların yükselişi." },
  { name: "Klasik Çağ", start: -550, end: 500, note: "Antik Yunan, Pers ve Roma gibi büyük medeniyetlerin dönemi." },
  { name: "Orta Çağ", start: 500, end: 1500, note: "Feodalizm, İslam'ın yayılması ve büyük imparatorlukların dönüşümü." },
  { name: "Yakın Çağ", start: 1500, end: 2025, note: "Coğrafi keşifler, sanayileşme ve küreselleşme dönemi." }
];

/** Verilen yılın hangi tarihsel çağa denk geldiğini döndürür. */
function getEraForYear(year) {
  return ERAS.find((era) => year >= era.start && year <= era.end) || ERAS[ERAS.length - 1];
}

/** Nüfus rakamını "3.000.000 kişi (tahmini)" gibi okunabilir metne çevirir. */
function formatPopulation(population) {
  if (population == null) return "Bilinmiyor";
  return `${population.toLocaleString("tr-TR")} kişi (tahmini)`;
}
