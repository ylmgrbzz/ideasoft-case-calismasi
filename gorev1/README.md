# İdeasoft Case Study - E-Ticaret Mobil Uygulaması

Bu proje, İdeasoft iş başvurusu kapsamında hazırlanmış bir case study çalışmasıdır. Uygulama, bir e-ticaret sisteminin mobil uygulamasını içermektedir.

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go (Fiziksel cihazda test için)

### Kurulum

1. Projeyi klonlayın:

```bash
git clone <repo-url>
cd gorev1
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

3. Uygulamayı başlatın:

```bash
npx expo start
```

4. Geliştirme ortamını seçin:

- Expo Go ile test için: QR kodu tarayın

## 🛠 Kullanılan Teknolojiler

### Frontend

- **React Native**: Mobil uygulama geliştirme framework'ü
- **Expo**: React Native geliştirme platformu
- **TypeScript**: Tip güvenliği için
- **Expo Router**: Sayfa yönetimi ve navigasyon

### State Yönetimi

- **Redux Toolkit**: Merkezi state yönetimi
- **RTK Query**: API istekleri ve cache yönetimi

### UI/UX

- Custom Components (ThemedText, ThemedView)
- Platform spesifik tasarımlar
- Modern ve responsive UI
- Loading states ve error handling
- Dark/Light tema desteği

## 📱 Uygulama Özellikleri

### Ana Sayfa

- Ürün listesi grid görünümü
- Her ürün için:
  - Ürün görseli
  - Ürün adı
  - Fiyat bilgisi
- Pull-to-refresh özelliği
- Arama sayfasına hızlı erişim
- Loading durumları için uygun gösterimler

### Arama Sayfası

- Anlık arama özelliği (debounce ile optimize edilmiş)
- Arama sonuçları grid görünümü
- Boş sonuç durumu için özel tasarım
- Arama geçmişi temizleme
- Geri dönüş navigasyonu

### Ürün Detay Sayfası

- Ürün detaylı bilgileri
- Ürün görseli
- Fiyat bilgisi
- Stok durumu

## 🌐 API Entegrasyonu

### Base URL

```
https://testcase.myideasoft.com/api
```

### Endpoints

- `GET /products`: Tüm ürünleri listele
- `GET /products/{id}`: Ürün detayını getir
- `GET /products/search`: Ürün ara

### API Özellikleri

- Sayfalama desteği (limit ve page parametreleri)
- Arama fonksiyonu
- Hata yönetimi
- Cache mekanizması

## 🏗 Proje Yapısı

```
gorev1/
├── app/                    # Sayfa bileşenleri
│   ├── index.tsx          # Ana sayfa
│   ├── search.tsx         # Arama sayfası
│   ├── _layout.tsx        # Ana layout
│   └── product/           # Ürün detay sayfaları
├── src/
│   ├── store/             # Redux store yapılandırması
│   │   ├── index.ts
│   │   └── services/
│   │       └── api.ts     # API servisleri
│   ├── types/             # TypeScript tipleri
│   │   └── product.ts
│   └── components/        # Paylaşılan bileşenler
├── assets/                # Resimler ve fontlar
│   ├── fonts/
│   └── images/           # Ürün görselleri
└── package.json
```

## 💡 Özellikler ve Best Practices

- TypeScript ile güçlü tip kontrolü
- Modern React Native özellikleri (Hooks, Functional Components)
- RTK Query ile optimistik güncellemeler
- Platform spesifik UI/UX iyileştirmeleri
- Temiz ve modüler kod yapısı
- Error boundary ve hata yönetimi
- Performans optimizasyonları

## 🔄 State Yönetimi

Redux Toolkit ve RTK Query kullanılarak:

- Merkezi state yönetimi
- API isteklerinin cache'lenmesi
- Optimistik güncellemeler
- Loading ve error state yönetimi

## 📱 Responsive Tasarım

- Dinamik grid sistemi
- Farklı ekran boyutlarına uyumlu kart tasarımı
- Platform spesifik UI ayarlamaları
- SafeArea desteği
- StatusBar yönetimi

## 🎨 UI Özellikleri

- Modern kart tasarımı
- Gölge efektleri
- Yumuşak geçişler
- Platform uyumlu ikonlar (Ionicons)
- Özelleştirilmiş font desteği
- Tema desteği (Dark/Light)

## 🔍 Arama Özellikleri

- Debounce ile optimize edilmiş arama
- Anlık sonuç gösterimi
- Boş durum yönetimi
- Temizleme özelliği
- Loading durumları

## 👤 Geliştirici

[Yalım Gürbüz]
