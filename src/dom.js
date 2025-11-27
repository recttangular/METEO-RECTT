// src/dom.js
import { getWeatherIcon } from './utils.js'; // Import fungsi ikon tadi

const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { weekday: 'short' }); // Singkat: Sen, Sel, Rab
};

export const renderWeatherCard = (city, weatherData) => {
    const container = document.getElementById('weather-container');
    
    // Data Utama
    const { temperature, weathercode } = weatherData.current_weather;
    
    // Ambil Ikon visual berdasarkan kode cuaca
    const weatherVisual = getWeatherIcon(weathercode);

    // Data Prediksi
    const { time, weathercode: dailyCodes, temperature_2m_max, temperature_2m_min } = weatherData.daily;

    // Loop Prediksi 3 Hari
    let forecastHTML = '';
    for (let i = 1; i <= 3; i++) {
        const dailyIcon = getWeatherIcon(dailyCodes[i]); // Ikon untuk besok/lusa
        
        forecastHTML += `
            <div class="flex flex-col items-center p-2 rounded-lg hover:bg-white/20 transition duration-300">
                <span class="text-xs font-semibold text-white/80">${formatDay(time[i])}</span>
                <span class="text-2xl my-1 drop-shadow-sm">${dailyIcon.icon}</span>
                <div class="flex gap-1 text-xs font-medium text-white">
                    <span>${temperature_2m_max[i]}°</span>
                    <span class="opacity-60">${temperature_2m_min[i]}°</span>
                </div>
            </div>
        `;
    }

    // HTML Card dengan gaya GLASSMORPHISM
    const cardHTML = `
        <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
            
            <div class="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white overflow-hidden">
                
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-2xl font-bold tracking-wide shadow-black drop-shadow-md">${city.name}</h3>
                        <p class="text-xs text-blue-100 flex items-center gap-1">
                            📍 ${city.lat.toFixed(2)}, ${city.lon.toFixed(2)}
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-5xl font-black tracking-tighter drop-shadow-lg">
                            ${Math.round(temperature)}°
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-4 mb-6 bg-black/20 p-4 rounded-xl border border-white/10">
                    <span class="text-6xl filter drop-shadow-xl animate-pulse-slow">
                        ${weatherVisual.icon}
                    </span>
                    <div>
                        <p class="text-lg font-bold">${weatherVisual.label}</p>
                        <p class="text-xs opacity-70">Update: Realtime</p>
                    </div>
                </div>

                <hr class="border-white/20 mb-4">

                <div class="grid grid-cols-3 gap-2 text-center">
                    ${forecastHTML}
                </div>
            </div>
        </div>
    `;

    container.innerHTML += cardHTML;
};