/**
 * İnsanlık tarihinin dönüm noktası olayları (buluşlar, keşifler, devrimler).
 * Tarihler kabaca tahminidir; her olay haritada bir yer işaretiyle gösterilir.
 *
 * Alanlar:
 *  id     : benzersiz anahtar
 *  name   : olayın adı
 *  year   : gerçekleştiği yıl (MÖ için negatif)
 *  lat/lon: ilişkili olduğu bölge
 *  icon   : haritada gösterilecek emoji simgesi
 *  note   : kısa açıklama
 */
const MILESTONE_EVENTS = [
  { id: "fire", name: "Ateşin Kontrollü Kullanımı", year: -400000, lat: 5, lon: 36, icon: "🔥", note: "İnsan atalarının ateşi ısınma, pişirme ve korunma için kullanmaya başlaması." },
  { id: "language", name: "Dil ve Simgesel Düşünce", year: -70000, lat: 10, lon: 40, icon: "🗣️", note: "Karmaşık dil ve soyut/simgesel düşüncenin gelişmeye başlaması." },
  { id: "agriculture", name: "Tarım Devrimi", year: -10000, lat: 33, lon: 40, icon: "🌾", note: "Bereketli Hilal'de bitkilerin evcilleştirilmesi, yerleşik yaşama geçiş." },
  { id: "pottery", name: "Çömlekçiliğin Gelişmesi", year: -9000, lat: 34, lon: 42, icon: "🏺", note: "Pişmiş toprak kapların üretilmeye başlanması." },
  { id: "wheel", name: "Tekerleğin İcadı", year: -3500, lat: 32, lon: 45, icon: "🛞", note: "Mezopotamya'da tekerleğin ulaşım ve üretimde kullanılması." },
  { id: "writing", name: "Yazının İcadı", year: -3200, lat: 31.0, lon: 45.8, icon: "✍️", note: "Sümer'de çivi yazısıyla ilk yazılı kayıtların tutulması." },
  { id: "bronze", name: "Bronzun Keşfi", year: -3300, lat: 38, lon: 35, icon: "⚒️", note: "Bakır ve kalayın karıştırılmasıyla bronzun üretilmesi." },
  { id: "iron", name: "Demirin İşlenmesi", year: -1200, lat: 40.02, lon: 34.61, icon: "⚙️", note: "Anadolu'da demir işleme teknolojisinin yaygınlaşması." },
  { id: "paper", name: "Kağıdın İcadı", year: 105, lat: 34.3, lon: 108.9, icon: "📜", note: "Çin'de Han Hanedanlığı döneminde kağıt üretiminin gelişmesi." },
  { id: "printing", name: "Matbaanın İcadı", year: 1440, lat: 50.0, lon: 8.27, icon: "🖨️", note: "Gutenberg'in hareketli harfli matbaayı geliştirmesi." },
  { id: "industrial", name: "Sanayi Devrimi", year: 1760, lat: 52.5, lon: -1.9, icon: "🏭", note: "İngiltere'de buhar gücü ve fabrika üretiminin yaygınlaşması." },
  { id: "electricity", name: "Elektriğin Yaygınlaşması", year: 1879, lat: 40.7, lon: -74.0, icon: "💡", note: "Ampul ve elektrik şebekelerinin günlük yaşama girmesi." },
  { id: "internet", name: "İnternetin Doğuşu", year: 1990, lat: 46.2, lon: 6.14, icon: "💻", note: "World Wide Web'in geliştirilmesiyle küresel bağlantı çağı." }
];
