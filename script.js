// Call API key from OpenWeatherMap.org
const API_KEY = 'c6a748a8e4903696717e6f378b5eb912'; 

// Function to fetch weather data for a city
// Using asynchronous function to handle promises // Apply API Key 
// The fetch request returns a Promise that resolves to the HTTP response from the API.
// City - Name of city which weather data will be fetched 
// First await - wait for fetch request to complete and for the repsonpse to be avaiable 
// Second await - wait for the JSON promise to resolve and obtain thw weather data in a usable format 
// Return the weather data 
async function fetchCityWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
  const data = await response.json();
  return data;
}

// Function to display current weather 
// The function retrieves the DOM element with the ID current-weather-info using document.getElementById.
// The weather information is updated by modifying the innerHTML of the weatherInfo element.
// Math.round to round up number and convert with following formula for temperature reading since it's at Kelvin on the API web 
// If needed to use C or K for temperature unit please use this <p>Temperature: ${data.main.temp} &#8490;</p> <p>Temperature: ${Math.round(data.main.temp - 273.15)} &#8451;</p>
function currentWeather(data) {
  const weatherInfo = document.getElementById('current-weather-info');
 weatherInfo.innerHTML = `
    <div class="weather-card">
      <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icons Display on the current weather">
      <div class="weather-info">
        <p class="date">${new Date(data.dt * 1000).toLocaleDateString()}</p>
        <p>${data.weather[0].main}</p>
        <p>Temperature: ${Math.round(((data.main.temp - 273.15))*(9/5)+32)} &#8457;</p>
        <p>Feels like: ${Math.round(((data.main.feels_like - 273.15))*(9/5)+32)} &#8457;</p>
        <p>Temp Min: ${Math.round(((data.main.temp_min - 273.15))*(9/5)+32)} &#8457;</p>
        <p>Temp Max: ${Math.round(((data.main.temp_max - 273.15))*(9/5)+32)} &#8457;</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      </div>
    </div>
  `;
}

// Function to display 5-day forecast
// Declare forcastInfo and create innerHTML to display 5 days weather data
// Accept a data parameter, which represents the weather data object retrieved from the API.
// Use for loop to iterate through the data.list array for multiple time intervals.
// Retrieve the DOM element with the ID selector forecast-info using document.getElementById.
// Math.round to round up number and convert with following formula for temperature reading since it's at Kelvin on the API web 
// By processing every 8th entry, the loop will display the forecast for each day in the five-day forecast, rather than showing forecast entries for every time interval within a day.
// if needed to use C or K for temperature unit please use this <p>Temperature: ${forecast.main.temp} &#8490;</p> <p>Temperature: ${Math.round(forecast.main.temp - 273.15)} &#8451;</p>
function fiveDayForcast(data) {
  const forecastInfo = document.getElementById('forecast-info');
  forecastInfo.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const forcastElement = document.createElement('div');
    forcastElement.classList.add('weather-card');
    forcastElement.innerHTML = `
      <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon">
      <div class="weather-info">
        <p class="date">${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
        <p>${forecast.weather[0].main}</p>
        <p>Temperature: ${Math.round(((forecast.main.temp - 273.15))*(9/5)+32)} &#8457;</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} m/s</p>
      </div>
    `;
    forecastInfo.appendChild(forcastElement);
  }
}

// Function to display search history
// Accepts a history parameter, which represents an array of previously searched cities.
// The innerHTML of the searchHistory element is cleared initially to remove any existing search history.
// Iterate through the history array with previously searched city names.
// For each city in the history, a new p element is created using document.createElement.
// Class searched-city is added to the cityName element using classList.add.
function searchHist(history) {
  const searchHistory = document.getElementById('search-history');
  searchHistory.innerHTML = '';
  history.forEach(city => {
    const cityName = document.createElement('p');
    cityName.textContent = city;
    cityName.classList.add('searched-city');
    searchHistory.appendChild(cityName);
  });
}

// Function cityInputSubmit to handle user input "city" submission
// Use trim() to remove any leading or trailing whitespace.
// Use if statement to check if the city name is valid.
// The fetchCityWeather function to fetch the weather data for the specified city, display the five-day forecast based on the fetched data, and add searched city to the search history.
// Log error to console if there is an error during fetch 
// Use CityInput value to reset the empty string and clear the input field.
function cityInputSubmit(event) {
  event.preventDefault();
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  if (city) {
    fetchCityWeather(city)
      .then(data => {
        currentWeather(data.list[0]);
        fiveDayForcast(data);
        addCityToHist(city);
      })
      .catch(error => {
        console.log('Error:', error);
      });
    cityInput.value = '';
  }
}

// Function to handle click on search history
// If the clicked city has the class searched-city, the code within the conditional block is executed.
// Use fetch as other functions 
function searchHistoryClickPB(event) {
  if (event.target.classList.contains('searched-city')) {
    const city = event.target.textContent;
    fetchCityWeather(city)
      .then(data => {
        currentWeather(data.list[0]);
        fiveDayForcast(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

// Function to add a city to search history
// This function adds a city to the search history by retrieving the existing history from the local storage
// Then updating it with the new city if necessary, and storing it back into the local storage. 
function addCityToHist(city) {
  let history = localStorage.getItem('searchHistory');
  if (history) {
    history = JSON.parse(history);
    if (!history.includes(city)) {
      history.push(city);
    }
  } else {
    history = [city];
  }
  localStorage.setItem('searchHistory', JSON.stringify(history));
  searchHist(history);
}

// Function to initialize the weather dashboard
// initializes the weather dashboard by setting up event listeners, retrieving the search history, displaying it on the dashboard,
// fetching and displaying the weather data for the last searched city 
function initWeatherDashboard() {
  const searchForm = document.getElementById('search-form');
  const searchHistory = document.getElementById('search-history');
  
  searchForm.addEventListener('submit', cityInputSubmit);
  searchHistory.addEventListener('click', searchHistoryClickPB);

  const history = localStorage.getItem('searchHistory');
  if (history) {
    const parsedHistory = JSON.parse(history);
    searchHist(parsedHistory);
    if (parsedHistory.length > 0) {
      const lastSearchedCity = parsedHistory[parsedHistory.length - 1];
      fetchCityWeather(lastSearchedCity)
        .then(data => {
          currentWeather(data.list[0]);
          fiveDayForcast(data);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  }
}

initWeatherDashboard();
