// src/main.js
import { cities } from './utils.js';
import { fetchWeather } from './api.js';
import { renderWeatherCard } from './dom.js';

// 1. Variabel Global untuk menyimpan data "mentah"
// Kita butuh ini agar saat filtering tidak perlu fetch API ulang (biar cepat)
let weatherDataStore = [];

const init = async () => {
    const container = document.getElementById('weather-container');
    const searchInput = document.getElementById('search-input');

    container.innerHTML = '<p class="text-center col-span-3 text-slate-500">Sedang memuat data cuaca...</p>';

    // 2. Fetch Data Sekali Saja di Awal
    console.log("Memulai aplikasi METEO-RECTT...");
    
    // Kita kosongkan store dulu
    weatherDataStore = [];

    for (const city of cities) {
        const data = await fetchWeather(city.lat, city.lon);
        
        if (data) {
            // SIMPAN data ke memori (Store)
            // Kita gabungkan data kota (nama) dan data cuaca (suhu) jadi satu paket
            weatherDataStore.push({
                cityInfo: city,
                weatherData: data
            });
        }
    }

    // 3. Tampilkan Semua Data Pertama Kali
    renderAll(weatherDataStore);

    // 4. Aktifkan Fitur Pencarian (Event Listener)
    // Setiap kali user mengetik (input), jalankan fungsi filter
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase(); // Ambil teks & jadikan huruf kecil
        
        // LOGIKA FILTER (Roadmap: Array Methods - Filter) 
        const filteredData = weatherDataStore.filter(item => {
            return item.cityInfo.name.toLowerCase().includes(keyword);
        });

        // Tampilkan hasil filter
        renderAll(filteredData);
    });
};

// Fungsi Helper untuk menampilkan data ke layar
const renderAll = (dataList) => {
    const container = document.getElementById('weather-container');
    container.innerHTML = ''; // Bersihkan layar sebelum menampilkan data baru

    if (dataList.length === 0) {
        container.innerHTML = '<p class="text-center col-span-3 text-slate-500">Kota tidak ditemukan.</p>';
        return;
    }

    // Loop data yang mau ditampilkan
    dataList.forEach(item => {
        renderWeatherCard(item.cityInfo, item.weatherData);
    });
};

init();