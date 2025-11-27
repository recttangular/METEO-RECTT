// src/main.js
import { cities } from './utils.js';
import { fetchWeather } from './api.js';
import { renderWeatherCard } from './dom.js';

let weatherDataStore = []; 

// 1. Fitur Jam Digital
const startClock = () => {
    const el = document.getElementById('digital-clock');
    setInterval(() => {
        el.innerText = new Date().toLocaleTimeString('id-ID');
    }, 1000);
};

// 2. Fungsi Fetch All (agar kode rapi bisa dipanggil ulang)
const loadInitialData = async () => {
    weatherDataStore = []; // Reset store
    for (const city of cities) {
        const data = await fetchWeather(city.lat, city.lon);
        if (data) weatherDataStore.push({ cityInfo: city, weatherData: data });
    }
    renderAll(weatherDataStore);
};

const init = async () => {
    const container = document.getElementById('weather-container');
    const searchInput = document.getElementById('search-input');
    const btnLocation = document.getElementById('btn-location');

    startClock();
    
    // Tampilkan Loading Spinner Keren
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-20 text-white/50">
            <div class="animate-spin h-10 w-10 border-4 border-pink-500 border-t-transparent rounded-full mb-4"></div>
            <p class="animate-pulse">Mengunduh data satelit...</p>
        </div>
    `;

    // Load Data Awal
    await loadInitialData();

    // 3. Fitur Filter Search
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = weatherDataStore.filter(item => 
            item.cityInfo.name.toLowerCase().includes(keyword)
        );
        renderAll(filtered);
    });

    // 4. Fitur GPS Geolocation 
    btnLocation.addEventListener('click', () => {
        if (!navigator.geolocation) return alert("Browser tidak support GPS");
        
        btnLocation.classList.add('animate-spin'); // Efek muter tombol
        
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            
            // Ambil data lokasi user
            const localData = await fetchWeather(latitude, longitude);
            
            if (localData) {
                // Render Ulang: Lokasi User Paling Atas + Data Lainnya
                container.innerHTML = '';
                
                // 1. Kartu User
                renderWeatherCard({ name: "📍 Lokasi Kamu", lat: latitude, lon: longitude }, localData);
                
                // 2. Kartu Kota Lainnya (Filter ulang agar konsisten)
                renderAll(weatherDataStore, false); // false = jangan bersihkan container (append)
            }
            btnLocation.classList.remove('animate-spin');
        }, () => {
            alert("Gagal mendeteksi lokasi.");
            btnLocation.classList.remove('animate-spin');
        });
    });
};

// Helper Render (Updated: Bisa append atau clear)
const renderAll = (dataList, clear = true) => {
    const container = document.getElementById('weather-container');
    if (clear) container.innerHTML = ''; // Bersihkan kalau diminta
    
    if (dataList.length === 0 && clear) {
        container.innerHTML = '<p class="text-center col-span-full text-white/50 py-10">Kota tidak ditemukan.</p>';
        return;
    }

    dataList.forEach(item => {
        renderWeatherCard(item.cityInfo, item.weatherData);
    });
};

init();