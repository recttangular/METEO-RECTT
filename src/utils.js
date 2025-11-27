export const cities = [
    { id: 1, name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { id: 2, name: "Makassar", lat: -5.1477, lon: 119.4327 },
    { id: 3, name: "Bandung", lat: -6.9175, lon: 107.6191 },
    { id: 4, name: "Jayapura", lat: -2.5337, lon: 140.7181 },
    { id: 5, name: "Tokyo", lat: 35.6895, lon: 139.6917 }
];
// src/utils.js (Tambahkan di bawah array cities)

// Fungsi Helper: Menerjemahkan kode angka ke Emoji & Warna
// Ini penerapan Object Mapping (pengganti if-else yang panjang)
export const getWeatherIcon = (code) => {
    const weatherMap = {
        0: { icon: "☀️", label: "Cerah", color: "text-yellow-500" },
        1: { icon: "🌤️", label: "Cerah Berawan", color: "text-orange-400" },
        2: { icon: "⛅", label: "Berawan", color: "text-gray-400" },
        3: { icon: "☁️", label: "Mendung", color: "text-slate-500" },
        45: { icon: "🌫️", label: "Berkabut", color: "text-slate-400" },
        48: { icon: "🌫️", label: "Kabut Tebal", color: "text-slate-500" },
        51: { icon: "zz", label: "Gerimis", color: "text-blue-300" },
        61: { icon: "🌧️", label: "Hujan Ringan", color: "text-blue-400" },
        63: { icon: "🌧️", label: "Hujan Sedang", color: "text-blue-500" },
        65: { icon: "⛈️", label: "Hujan Lebat", color: "text-blue-700" },
        80: { icon: "🌦️", label: "Hujan Lokal", color: "text-blue-400" },
        95: { icon: "⚡", label: "Badai Petir", color: "text-purple-500" },
    };

    // Jika kodenya tidak ada di daftar, pakai default (Awan)
    return weatherMap[code] || { icon: "❓", label: "Tidak Diketahui", color: "text-gray-400" };
};