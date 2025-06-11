document.addEventListener('DOMContentLoaded', () =>{
  const cityInput = document.getElementById('city-input');
  const getWeather = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const temperatureDisplay = document.getElementById('temperature')
  const cityNameDisplay = document.getElementById('city-name');
  const descriptionDisplay = document.getElementById('description');
  const errorMsg = document.getElementById('error-message');

  const API_KEY = "44dbeceeb6d6248b117d183de8104112";

  getWeather.addEventListener('click', async () =>{
    const city = cityInput.value.trim();
    if(!city) return;

    try {
    const weatherData =  await fetchWeatherData(city);
    displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
     const response = await fetch(url);
     if(!response.ok){
      throw new Error("City not found!!!")
     }
     const data = await response.json();     
     return data;
     
     
     
    
  };

  function displayWeatherData(data) {
    const {name, main, weather} = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`

    //unlock the display
    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    
    
  }

  function showError() {
    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  }


})