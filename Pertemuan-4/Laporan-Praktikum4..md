# Praktikum 4: React Native Navigation #

## Tujuan Pembelajaran ##
Mahasiswa mampu:
1. Merancang dan menerapkan navigasi antar layar (screen) pada aplikasi React Native.
2. Menggunakan library React Navigation (Stack Navigator, Tab Navigator, Drawer Navigator).

## Alur Praktikum ##

### Langkah 1: Inisialisasi Proyek React Native ###
1. Buka terminal atau command promt
2. Ubah directori ke Folder Pertemuan 4 ( cd "Pemrograman Mobile\Pertemuan-4")
3. Buat proyek baru menggunakan perintah berikut : 'npx create-expo-app ptmn4 --template blank'
4. Masuk ke dalam folder proyek menggunakan perintah berikut: 'cd ptmn4'
5. Install core navigation library (npm install @react-navigation/native)
6. Install dependensi pendukung (wajib untuk Expo) npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

### Langkah 2: Membuat Stack Navigator ###
1. Install Pustaka Stack: npm install @react-navigation/native-stack
2. Buat Folder didalam projek dengan nama screens
3. Didalam folder screens buat 2 file dengab nama Login.js dan SignUp.js
4. Masukkan kode sesuai pada modul Praktikum 4
5. Sesuaikan file App.js dengan kode yang ada pada modul.
6. Simpan dan Install dependensi untuk web "npx expo install react-dom react-native-web"
7. Jalankan Perintah npx expo start --web
8. Konfirmasi Bukti

![alt text](bukti2-p4.gif)
'''

### Langkah 3: Bottom Tab Navigation ###
1. Instalasi Pustaka Bottom Tabs: npm install @react-navigation/native-stack
2. Membuat File Layar (Screens) Buat dua file baru di dalam folder screens: HomeScreen.js dan ProfileScreen.js
3. Konfigurasi Tab di App.js ubah isi App.js
4. Konfirmasi Bukti

![alt text](image-1.png)

'''

### Langkah 4: Drawer Navigation ###
1. Instalasi Pustaka Drawer npm install @react-navigation/drawer # Pastikan juga plugin reanimated sudah terinstall dan dikonfigurasi di babel.config.js jika diperlukan
2. Konfigurasi Drawer di App.js Ubah kembali file App.js untuk mencoba Drawer Navigation menggunakan layar Home dan Profile yang sudah dibuat sebelumnya
3. Konfirmasi Bukti

![alt text](<bukti 4-p4.gif>)