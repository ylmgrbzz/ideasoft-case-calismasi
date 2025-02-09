# İdeasoft Case Study Projeleri

Bu repository, İdeasoft iş başvurusu kapsamında hazırlanmış iki farklı case study projesini içermektedir.

## 📱 Projeler

### 1. E-Ticaret Mobil Uygulaması (gorev1)

Birinci proje, bir e-ticaret sisteminin mobil uygulamasını içermektedir. Bu uygulama, kullanıcıların ürünleri listeleyebileceği, arayabileceği ve detaylarını görüntüleyebileceği bir mobil arayüz sunmaktadır.

[Detaylı bilgi için tıklayınız](./gorev1/README.md)

#### Öne Çıkan Özellikler

- Modern ve responsive UI tasarımı
- Anlık ürün arama
- Ürün detay görüntüleme
- Platform spesifik optimizasyonlar

### 2. E-Ticaret Yönetim Paneli (gorev2)

İkinci proje, e-ticaret sisteminin yönetim panelini içermektedir. Bu uygulama, ürün ve kategori yönetimini sağlayan kapsamlı bir yönetim arayüzü sunmaktadır.

[Detaylı bilgi için tıklayınız](./gorev2/README.md)

#### Öne Çıkan Özellikler

- Kategori yönetimi (CRUD işlemleri)
- Ürün yönetimi (CRUD işlemleri)
- Detaylı form validasyonları
- Optimistik UI güncellemeleri
- Modern yönetim arayüzü

## 🚀 Hızlı Başlangıç

Her iki proje de Expo ile geliştirilmiş React Native uygulamalarıdır. Projeleri çalıştırmak için:

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go (Fiziksel cihazda test için)

### Kurulum ve Çalıştırma

1. Repository'yi klonlayın:

```bash
git clone <repo-url>
```

2. İlgili projeye gidin:

```bash
# Birinci proje için
cd gorev1

# veya İkinci proje için
cd gorev2
```

3. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

4. Uygulamayı başlatın:

```bash
npx expo start
```

## 🛠 Kullanılan Teknolojiler

### Ortak Teknolojiler

- **React Native & Expo**: Mobil uygulama geliştirme
- **TypeScript**: Tip güvenliği
- **Redux Toolkit & RTK Query**: State yönetimi
- **Expo Router**: Navigasyon

### UI/UX

- Custom Components
- Platform spesifik tasarımlar
- Modern ve responsive UI
- Loading states ve error handling
- Dark/Light tema desteği

## 🌐 API Entegrasyonları

### Base URL

```
https://testcase.myideasoft.com
```

### Endpoints

#### Görev 1 (Mobil Uygulama)

- `GET /api/products`: Ürün listesi
- `GET /api/products/{id}`: Ürün detayı
- `GET /api/products/search`: Ürün arama

#### Görev 2 (Yönetim Paneli)

- `GET /admin-api/categories`: Kategori listesi
- `POST /admin-api/categories`: Yeni kategori
- `PUT /admin-api/categories/{id}`: Kategori güncelleme
- `DELETE /admin-api/categories/{id}`: Kategori silme
- `GET /admin-api/products`: Ürün listesi
- `POST /admin-api/products`: Yeni ürün
- `DELETE /admin-api/products/{id}`: Ürün silme

## 💡 Özellikler ve Best Practices

- TypeScript ile güçlü tip kontrolü
- Modern React Native özellikleri
- RTK Query ile optimistik güncellemeler
- Platform spesifik UI/UX iyileştirmeleri
- Temiz ve modüler kod yapısı
- Error boundary ve hata yönetimi
- Performans optimizasyonları

## 📱 Responsive Tasarım

- Dinamik grid sistemleri
- Platform spesifik UI ayarlamaları
- SafeArea desteği
- StatusBar yönetimi
- Farklı ekran boyutlarına uyumluluk

## 👤 Geliştirici

[Yalım Gürbüz]

## 📝 Lisans

Bu projeler İdeasoft'un mülkiyetindedir ve sadece değerlendirme amaçlıdır.
