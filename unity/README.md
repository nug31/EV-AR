# EV-AR Unity (AR Foundation) Setup

Tujuan: menyiapkan proyek Unity AR (Android/iOS) untuk AR yang stabil (plane detection, tap-to-place, pinch/rotate, light estimation).

## 1) Prasyarat
- OS: Windows 10/11 (Android) atau macOS (iOS)
- Unity Hub + Unity 2022.3 LTS (disarankan)
- Module Build Support:
  - Android Build Support (Android SDK & NDK, OpenJDK)
  - iOS Build Support (butuh macOS + Xcode)

## 2) Buat Project Unity
1. Buka Unity Hub → New Project → Template: 3D (URP opsional) → Name: `EV-AR-Unity`
2. Setelah project terbuka, buka Window → Package Manager:
   - Install/Enable:
     - AR Foundation (5.x sesuai Unity 2022 LTS)
     - ARCore XR Plugin (untuk Android)
     - ARKit XR Plugin (untuk iOS)
     - (Opsional) XR Interaction Toolkit

## 3) Struktur Scene (ARMain)
1. Buat Scene baru: `Assets/Scenes/ARMain.unity`
2. Tambahkan GameObject:
   - `AR Session` (komponen: AR Session)
   - `AR Session Origin` (komponen: AR Session Origin)
     - Tambah komponen pada AR Session Origin:
       - AR Camera (child: Camera bertag `MainCamera`)
       - AR Camera Manager
       - AR Camera Background
       - AR Raycast Manager
       - AR Plane Manager (assign plane prefab sederhana / gunakan visualizer bawaan)
     - Tambah komponen skrip:
       - TapToPlace.cs (drag ke AR Session Origin)
       - GestureScaleRotate.cs (drag ke AR Session Origin)
       - PlaceOnPlaneReticle.cs (opsional untuk reticle)
   - Tambah Directional Light (opsional) dan skrip LightEstimationToDirectional.cs
3. Siapkan Prefab:
   - Import model baterai (GLB/FBX) ke `Assets/Models/Battery/`
   - Buat Prefab dari model tersebut
   - Assign ke field `placeablePrefab` di TapToPlace.

## 4) Skrip yang disediakan (di `Assets/Scripts/`)
- TapToPlace.cs – tap untuk menaruh/relocate objek di plane
- GestureScaleRotate.cs – pinch untuk scale & 2-finger rotate
- PlaceOnPlaneReticle.cs – reticle hijau untuk indikator plane (opsional)
- LightEstimationToDirectional.cs – estimasi cahaya dari AR Camera ke Directional Light

## 5) Android Build
1. File → Build Settings → Android → Switch Platform
2. Player Settings:
   - Other Settings:
     - Package Name: `com.yourcompany.evar`
     - Minimum API Level: Android 8.0 (API 26) atau lebih
     - Target API Level: rekomendasi terbaru (Auto Highest)
     - Scripting Backend: IL2CPP, Target Architectures: ARM64
   - Resolution & Presentation: Orientation Portrait (opsional)
   - XR Plug-in Management: centang ARCore
3. Build (APK/AAB) → install ke device (aktifkan `USB debugging` di Android)

## 6) iOS Build (opsional)
1. (macOS) Switch Platform → iOS
2. Player Settings:
   - Scripting Backend: IL2CPP, Target: ARM64
   - Camera Usage Description: `Augmented Reality` (di iOS)
   - XR Plug-in Management: centang ARKit
3. Build → Buka project di Xcode → set signing → run ke device

## 7) Integrasi dengan Web/App
- Upload APK ke Netlify (folder downloads) atau GitHub Releases
- Tambahkan tombol di web (React) ke APK download/testflight

## 8) Tips Kualitas AR
- Gunakan material PBR untuk model agar lighting estimation natural
- Aktifkan VFX halus (Contact Shadows via projector atau SRP features jika URP)
- Kurangi polygon model untuk performa mobile

## 9) Known Issues
- AR membutuhkan device dengan sensor dan dukungan ARCore/ARKit
- Izin kamera wajib

Selanjutnya:
- Buka folder `Assets/Scripts/` (yang kami sediakan) → drag & drop ke project Unity Anda
- Ikuti langkah di atas untuk membuat scene `ARMain` dan assign skrip/komponen.

