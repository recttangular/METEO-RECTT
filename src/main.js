// src/main.js
// Import: Memanggil bantuan dari file lain
import { cities } from './utils.js';
import { fetchWeather } from './api.js';

const init = async () => {
    // 1. Ambil kota pertama dari gudang (Jakarta)
    const city = cities[0]; 
    console.log(`Sedang mengecek cuaca di: ${city.name}...`);

    // 2. Suruh kurir cek cuaca di koordinat Jakarta
    const weatherData = await fetchWeather(city.lat, city.lon);

    // 3. Tampilkan laporannya di Console (Layar hitam Inspect Element)
    console.log("Laporan Cuaca Diterima:", weatherData);
};

// Jalankan perintah manajer
init();