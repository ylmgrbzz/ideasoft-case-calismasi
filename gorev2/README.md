# İdeasoft Case Study - E-Ticaret Yönetim Uygulaması

Bu proje, İdeasoft iş başvurusu kapsamında hazırlanmış bir case study çalışmasıdır. Uygulama, bir e-ticaret sisteminin kategori ve ürün yönetim modüllerini içermektedir.

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
cd gorev2
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

- Custom Components
- Platform spesifik tasarımlar
- Modern ve responsive UI
- Loading states ve error handling

## 📱 Uygulama Özellikleri

### Kategori Yönetimi

#### Kategori Listeleme

- Tüm kategorilerin listesi
- Her kategori için detaylı bilgi gösterimi (isim, durum, sıralama, alt kategori bilgisi)
- Pull-to-refresh özelliği
- Yükleme ve hata durumları için uygun gösterimler
- Boş liste durumu için özel tasarım

#### Kategori Ekleme

- Yeni kategori oluşturma formu
- Form validasyonu
- Başarılı/başarısız durumlar için bildirimler
- Otomatik slug oluşturma

#### Kategori Düzenleme

- Mevcut kategori bilgilerini düzenleme
- Aynı form yapısının yeniden kullanımı
- Güncelleme sonrası otomatik yönlendirme

#### Kategori Silme

- Silme işlemi için onay dialogu
- Başarılı/başarısız durumlar için bildirimler
- Liste otomatik güncelleme

### Ürün Yönetimi

#### Ürün Listeleme

- Tüm ürünlerin listesi
- Her ürün için detaylı bilgi gösterimi:
  - Ürün görseli
  - İsim ve tam isim
  - Stok durumu ve miktarı
  - Fiyat bilgisi (TL)
  - SKU ve Barkod bilgileri
- Pull-to-refresh özelliği
- Yükleme ve hata durumları
- Boş liste durumu için özel tasarım

#### Ürün Ekleme

- Kapsamlı ürün ekleme formu:
  - Ürün adı ve tam adı
  - Kategori seçimi (dropdown)
  - Stok miktarı
  - Fiyat
  - Otomatik SKU oluşturma
  - Para birimi (TL)
  - Vergi ve garanti bilgileri
  - Stok tipi ve birim seçimi
- Form validasyonu
- Başarılı/başarısız durumlar için bildirimler

#### Ürün Silme

- Silme işlemi için onay dialogu
- Başarılı/başarısız durumlar için bildirimler
- Liste otomatik güncelleme

## 🌐 API Entegrasyonu

### Base URL

```
https://testcase.myideasoft.com/admin-api
```

### Endpoints

#### Kategoriler

- `GET /categories`: Tüm kategorileri listele
- `POST /categories`: Yeni kategori ekle
- `PUT /categories/{id}`: Kategori güncelle
- `DELETE /categories/{id}`: Kategori sil

#### Ürünler

- `GET /products`: Tüm ürünleri listele
- `POST /products`: Yeni ürün ekle
- `PUT /products/{id}`: Ürün güncelle
- `DELETE /products/{id}`: Ürün sil

### Authentication

- Bearer token authentication
- Token header'da gönderiliyor

## 🏗 Proje Yapısı

```
gorev2/
├── app/                    # Sayfa bileşenleri
│   ├── categories.tsx      # Kategori listeleme
│   ├── add-category.tsx    # Kategori ekleme/düzenleme
│   ├── products.tsx        # Ürün listeleme
│   └── add-product.tsx     # Ürün ekleme
├── src/
│   ├── store/             # Redux store yapılandırması
│   │   ├── index.ts
│   │   └── services/
│   │       └── api.ts     # API servisleri
│   ├── types/             # TypeScript tipleri
│   │   ├── category.ts
│   │   └── product.ts
│   └── components/        # Paylaşılan bileşenler
├── assets/                # Resimler ve fontlar
│   └── images/           # Ürün ve kategori görselleri
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
- Tag-based invalidation

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 👤 Geliştirici

[Yalım Gürbüz]
