// src/dom.js

// Helper kecil untuk ubah tanggal "2025-11-28" jadi "Jumat"
// Ini teknik manipulasi Date object bawaan JS
const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { weekday: 'long' });
};

export const renderWeatherCard = (city, weatherData) => {
    const container = document.getElementById('weather-container');
    
    // 1. Data Cuaca Saat Ini (Current)
    const { temperature, weathercode: currentCode } = weatherData.current_weather;

    // 2. Data Prediksi Harian (Daily) - Destructuring Array di dalam Object
    const { time, weathercode, temperature_2m_max, temperature_2m_min } = weatherData.daily;

    // 3. Kita bikin HTML untuk 3 hari kedepan (Looping manual index 1, 2, 3)
    // Kenapa mulai index 1? Karena index 0 adalah HARI INI. Kita butuh "Ke Depan".
    let forecastHTML = '';
    for (let i = 1; i <= 3; i++) {
        forecastHTML += `
            <div class="flex flex-col items-center p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span class="text-xs font-bold text-slate-600">${formatDay(time[i])}</span>
                <span class="text-xs text-slate-400 mb-1">${time[i].split('-')[2]}/${time[i].split('-')[1]}</span>
                <div class="text-sm font-bold text-blue-600">${temperature_2m_max[i]}°</div>
                <div class="text-xs text-slate-500">${temperature_2m_min[i]}°</div>
            </div>
        `;
    }

    // 4. Gabungkan semuanya ke dalam Card Utama
    const cardHTML = `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-blue-500">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-800">${city.name}</h3>
                    <p class="text-xs text-slate-500">Lat: ${city.lat}, Lon: ${city.lon}</p>
                </div>
                <div class="text-right">
                    <div class="text-4xl font-bold text-blue-600">${temperature}°C</div>
                    <p class="text-xs text-slate-500">Kode: ${currentCode}</p>
                </div>
            </div>
            
            <hr class="border-slate-100 mb-4">
            <p class="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Prediksi 3 Hari</p>

            <div class="grid grid-cols-3 gap-2">
                ${forecastHTML} 
            </div>
        </div>
    `;

    container.innerHTML += cardHTML;
};