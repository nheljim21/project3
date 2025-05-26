const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key

document.getElementById('weatherForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      <div><strong>${data.weather[0].main}:</strong> ${data.weather[0].description}</div>
      <div><strong>Temperature:</strong> ${data.main.temp}°C</div>
      <div><strong>Humidity:</strong> ${data.main.humidity}%</div>
      <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: #d32f2f;">${error.message}</span>`;
  }
});
