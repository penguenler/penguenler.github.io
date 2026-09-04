/**
 * Basitleştirilmiş insanlık tarihi veri seti.
 * Tarihler, konumlar ve nüfus rakamları eğitim/görselleştirme amaçlıdır, akademik kesinlik iddia etmez.
 *
 * Alanlar:
 *  id         : benzersiz anahtar
 *  name       : ekranda görünecek isim
 *  region     : renk paletini belirleyen bölge/kültür grubu (bkz. main.js REGION_COLORS)
 *  start      : başlangıç yılı (MÖ için negatif)
 *  end        : bitiş yılı
 *  territory  : güncel koordinat sistemiyle yaklaşık yayılım alanı
 *  population : tahmini zirve nüfus (belirsizse null)
 *  note       : kısa açıklama
 */
const CIVILIZATIONS = [
  { id: "sapiens", name: "Homo sapiens (Doğu Afrika)", region: "species", start: -300000, end: -10000, lat: 2, lon: 38, scale: 3, population: 200000, note: "Anatomik olarak modern insanın ortaya çıkışı." },
  { id: "neanderthal", name: "Neandertaller", region: "species", start: -400000, end: -40000, lat: 48, lon: 10, scale: 3, population: 70000, note: "Avrupa ve Batı Asya'da yaşayan insan türü." },
  { id: "denisovan", name: "Denisovalılar", region: "species", start: -300000, end: -40000, lat: 51, lon: 86, scale: 2, population: null, note: "Orta ve Doğu Asya'da yaşayan arkaik insan grubu." },
  { id: "outofafrica", name: "Afrika Dışına Göçler", region: "species", start: -70000, end: -40000, lat: 15, lon: 45, scale: 4, population: 5000, note: "Homo sapiens'in Afrika dışına yayılma dalgaları." },
  { id: "natufian", name: "Natufian Kültürü", region: "middle_east", start: -12500, end: -9500, lat: 32, lon: 35.3, scale: 2, population: 100000, note: "Yerleşik yaşama geçişin ilk izleri, Levant bölgesi." },
  { id: "gobeklitepe", name: "Göbekli Tepe", region: "middle_east", start: -9600, end: -8000, lat: 37.22, lon: 38.92, scale: 2, population: 500, note: "Bilinen en eski anıtsal tapınak yerleşimi." },
  { id: "catalhoyuk", name: "Çatalhöyük", region: "middle_east", start: -7500, end: -5700, lat: 37.67, lon: 32.83, scale: 2, population: 8000, note: "Anadolu'da büyük Neolitik yerleşim." },
  { id: "sumer", name: "Sümer", region: "middle_east", start: -4500, end: -1900, lat: 31.0, lon: 45.8, scale: 3, population: 800000, note: "Mezopotamya'da ilk şehir devletleri, yazının icadı." },
  { id: "egypt", name: "Eski Mısır", region: "africa", start: -3100, end: -30, lat: 26.0, lon: 31.0, scale: 4, population: 3000000, note: "Nil Vadisi'nde binlerce yıl süren medeniyet." },
  { id: "indus", name: "İndus Vadisi Medeniyeti", region: "south_asia", start: -3300, end: -1300, lat: 27.3, lon: 68.1, scale: 4, population: 5000000, note: "Planlı şehirleriyle bilinen Güney Asya medeniyeti." },
  { id: "akkad", name: "Akad İmparatorluğu", region: "middle_east", start: -2334, end: -2154, lat: 33.06, lon: 44.2, scale: 3, population: 500000, note: "Bilinen ilk imparatorluklardan biri." },
  { id: "oldchina", name: "Xia / Shang Hanedanlığı", region: "east_asia", start: -2070, end: -1046, lat: 34.7, lon: 113.0, scale: 3, population: 5000000, note: "Çin'in ilk hanedanlık dönemleri." },
  { id: "minoan", name: "Minos Medeniyeti", region: "europe", start: -2700, end: -1450, lat: 35.2, lon: 25.0, scale: 2, population: 300000, note: "Girit adasında Ege'nin ilk gelişmiş kültürü." },
  { id: "babylon", name: "Babil", region: "middle_east", start: -1894, end: -539, lat: 32.5, lon: 44.4, scale: 3, population: 1000000, note: "Hammurabi Kanunları ile tanınan Mezopotamya gücü." },
  { id: "hittite", name: "Hitit İmparatorluğu", region: "middle_east", start: -1600, end: -1178, lat: 40.02, lon: 34.61, scale: 3, population: 2000000, note: "Anadolu merkezli demir çağı imparatorluğu." },
  { id: "olmec", name: "Olmek Medeniyeti", region: "americas", start: -1200, end: -400, lat: 17.9, lon: -94.5, scale: 2, population: 350000, note: "Mezoamerika'nın 'ana kültürü' kabul edilir." },
  { id: "phoenicia", name: "Fenike", region: "middle_east", start: -1200, end: -539, lat: 34.4, lon: 35.8, scale: 2, population: 500000, note: "Akdeniz'de deniz ticareti ve alfabenin yayılması." },
  { id: "assyria", name: "Asur İmparatorluğu", region: "middle_east", start: -2500, end: -609, lat: 35.4, lon: 43.3, scale: 3, population: 5000000, note: "Uzun süreli askeri açıdan güçlü Mezopotamya devleti." },
  { id: "greece", name: "Antik Yunan", region: "europe", start: -800, end: -146, lat: 37.98, lon: 23.73, scale: 3, population: 3000000, note: "Felsefe, demokrasi ve bilimin beşiği şehir devletleri." },
  { id: "persia", name: "Ahameniş (Pers) İmparatorluğu", region: "middle_east", start: -550, end: -330, lat: 29.9, lon: 52.9, scale: 4, population: 17000000, note: "Tarihin ilk kıtalar arası büyük imparatorluğu." },
  { id: "zhou", name: "Zhou Hanedanlığı", region: "east_asia", start: -1046, end: -256, lat: 34.3, lon: 108.9, scale: 3, population: 20000000, note: "Konfüçyüs ve Taoizm'in doğduğu dönem." },
  { id: "maurya", name: "Maurya İmparatorluğu", region: "south_asia", start: -322, end: -185, lat: 25.5, lon: 85.1, scale: 3, population: 50000000, note: "Hindistan'ı büyük ölçüde birleştiren ilk imparatorluk." },
  { id: "carthage", name: "Kartaca", region: "africa", start: -814, end: -146, lat: 36.85, lon: 10.3, scale: 3, population: 700000, note: "Batı Akdeniz'de güçlü bir deniz ticareti devleti." },
  { id: "rome", name: "Roma İmparatorluğu", region: "europe", start: -27, end: 476, lat: 41.9, lon: 12.5, scale: 5, population: 60000000, note: "Avrupa, Kuzey Afrika ve Ortadoğu'yu kapsayan dev imparatorluk." },
  { id: "han", name: "Han Hanedanlığı", region: "east_asia", start: -206, end: 220, lat: 34.3, lon: 108.9, scale: 4, population: 60000000, note: "İpek Yolu'nun geliştiği güçlü Çin hanedanlığı." },
  { id: "maya", name: "Maya Medeniyeti", region: "americas", start: -250, end: 900, lat: 17.2, lon: -89.6, scale: 3, population: 2000000, note: "Gelişmiş takvim ve yazı sistemine sahip Mezoamerika kültürü." },
  { id: "teotihuacan", name: "Teotihuacan", region: "americas", start: 100, end: 550, lat: 19.69, lon: -98.84, scale: 2, population: 125000, note: "Mezoamerika'nın en büyük antik şehirlerinden biri." },
  { id: "aksum", name: "Aksum İmparatorluğu", region: "africa", start: 100, end: 940, lat: 14.13, lon: 38.72, scale: 2, population: 1000000, note: "Doğu Afrika'da ticaret ve Hristiyanlığın erken merkezi." },
  { id: "sasanian", name: "Sasani İmparatorluğu", region: "middle_east", start: 224, end: 651, lat: 32.6, lon: 44.4, scale: 3, population: 9000000, note: "İslam öncesi son büyük Pers imparatorluğu." },
  { id: "byzantium", name: "Bizans İmparatorluğu", region: "europe", start: 330, end: 1453, lat: 41.0, lon: 28.98, scale: 4, population: 12000000, note: "Roma'nın doğu mirasçısı, Ortodoks Hristiyanlık merkezi." },
  { id: "gupta", name: "Gupta İmparatorluğu", region: "south_asia", start: 320, end: 550, lat: 25.5, lon: 85.1, scale: 3, population: 50000000, note: "Hindistan'ın 'altın çağı' olarak anılan dönem." },
  { id: "caliphate", name: "İslam Halifeliği", region: "middle_east", start: 632, end: 1258, lat: 33.3, lon: 44.4, scale: 4, population: 30000000, note: "Emevi ve Abbasi dönemlerinde geniş İslam coğrafyası." },
  { id: "tang", name: "Tang Hanedanlığı", region: "east_asia", start: 618, end: 907, lat: 34.3, lon: 108.9, scale: 4, population: 80000000, note: "Çin'in kültürel ve ekonomik açıdan zirve dönemlerinden." },
  { id: "vikings", name: "Viking Çağı", region: "europe", start: 793, end: 1066, lat: 60.4, lon: 5.3, scale: 2, population: 2000000, note: "İskandinav denizcilerin Avrupa'yı etkilediği dönem." },
  { id: "zimbabwe", name: "Büyük Zimbabve", region: "africa", start: 1100, end: 1450, lat: -20.3, lon: 30.9, scale: 2, population: 200000, note: "Güney Afrika'da taş yapılarıyla ünlü krallık." },
  { id: "mali", name: "Mali İmparatorluğu", region: "africa", start: 1235, end: 1600, lat: 12.6, lon: -8.0, scale: 3, population: 1200000, note: "Batı Afrika'da altın ticaretiyle zenginleşen imparatorluk." },
  { id: "mongol", name: "Moğol İmparatorluğu", region: "steppe", start: 1206, end: 1368, lat: 47.9, lon: 106.9, scale: 5, population: 100000000, note: "Tarihin en geniş bitişik kara imparatorluğu." },
  { id: "aztec", name: "Aztek İmparatorluğu", region: "americas", start: 1345, end: 1521, lat: 19.43, lon: -99.13, scale: 3, population: 5000000, note: "Orta Amerika'da güçlü bir şehir devletleri konfederasyonu." },
  { id: "inca", name: "İnka İmparatorluğu", region: "americas", start: 1438, end: 1533, lat: -13.5, lon: -71.9, scale: 3, population: 10000000, note: "And Dağları boyunca uzanan büyük Güney Amerika devleti." },
  { id: "ottoman", name: "Osmanlı İmparatorluğu", region: "middle_east", start: 1299, end: 1922, lat: 41.0, lon: 28.98, scale: 4, population: 35000000, note: "Üç kıtaya yayılan uzun ömürlü imparatorluk." },
  { id: "ming", name: "Ming Hanedanlığı", region: "east_asia", start: 1368, end: 1644, lat: 39.9, lon: 116.4, scale: 4, population: 160000000, note: "Çin Seddi'nin büyük bölümünün inşa edildiği dönem." },
  { id: "songhai", name: "Songhay İmparatorluğu", region: "africa", start: 1464, end: 1591, lat: 16.3, lon: -0.04, scale: 3, population: 1000000, note: "Batı Afrika'nın en büyük imparatorluklarından." },
  { id: "safavid", name: "Safevi İmparatorluğu", region: "middle_east", start: 1501, end: 1736, lat: 35.7, lon: 51.4, scale: 3, population: 6000000, note: "İran'da Şii İslam'ı devlet dini yapan hanedanlık." },
  { id: "mughal", name: "Babür İmparatorluğu", region: "south_asia", start: 1526, end: 1857, lat: 28.6, lon: 77.2, scale: 4, population: 150000000, note: "Hindistan alt kıtasında güçlü İslami imparatorluk." },
  { id: "spanish", name: "İspanyol İmparatorluğu", region: "europe", start: 1492, end: 1898, lat: 40.4, lon: -3.7, scale: 5, population: 60000000, note: "Amerika kıtasında geniş sömürge ağı kuran imparatorluk." },
  { id: "russian", name: "Rus İmparatorluğu", region: "europe", start: 1721, end: 1917, lat: 55.75, lon: 37.6, scale: 4, population: 125000000, note: "Avrupa'dan Pasifik'e uzanan geniş kara imparatorluğu." },
  { id: "british", name: "İngiliz İmparatorluğu", region: "europe", start: 1583, end: 1997, lat: 51.5, lon: -0.12, scale: 5, population: 412000000, note: "Tarihin en geniş deniz aşırı imparatorluğu." },
  { id: "qing", name: "Qing Hanedanlığı", region: "east_asia", start: 1644, end: 1912, lat: 39.9, lon: 116.4, scale: 4, population: 400000000, note: "Çin'in son imparatorluk hanedanlığı." }
];
