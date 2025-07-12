
const API_KEY = '3a648e757fde407793d91002251207'; 
const fetchBtn = document.getElementById('fetchBtn');
const cityInput = document.getElementById('cityInput');
const weatherOutput = document.getElementById('weatherOutput');

async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('City not found or API error');
    }

    const data = await response.json();

    const location = `${data.location.name}, ${data.location.country}`;
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;

    weatherOutput.innerHTML = `
      <strong>Location:</strong> ${location} <br/>
      <strong>Temperature:</strong> ${tempC}°C <br/>
      <strong>Condition:</strong> ${condition}
    `;
  } catch (error) {
    weatherOutput.textContent = `Error: ${error.message}`;
  }
}

fetchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    weatherOutput.textContent = 'Please enter a city name.';
    return;
  }
  weatherOutput.textContent = 'Loading...';
  fetchWeather(city);
});
