// require("dotenv").config();

// Variables and element selection:
<<<<<<< HEAD
const apiKey = process.env.API_KEY
=======
const apiKey = "f382cadccef19526187fd2efd55fdffe";
>>>>>>> 5fd927c9260733a1e5eec64c5d0d2f96e12632c6
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loaderIcon = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Functions:
// Changes the "hide" class of the loader icon while waiting for the API response.
const toggleLoader = () => {
  loaderIcon.classList.toggle("hide");
};

// Function with the objective of obtaining the meteorological data of the specified city.
const getWeatherData = async (cityName) => {
  try {
    clearCityInput();
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}&lang=en`;
    const apiResponse = await Promise.race([fetch(`${apiWeatherURL}`), new Promise((_, reject) => setTimeout(() => reject(new Error('Connection attempts timed out!')), 3000))]);
    const apiData = await apiResponse.json();


    toggleLoader();
    return apiData;
  } catch (error) {
    console.error(`An error has occurred: ${error.message}`);
  }
};

// Receives the weather data of the specified city and displays city information.
const showWeatherData = async (cityName) => {
  try {
    if (!cityName.trim()) {
      throw new Error(`You must enter a city!`);
      return;
    }

      const cityPattern = /^[a-zA-Z\s]+$/

      if (!cityPattern.test(cityName)) {
        throw new Error(`Invalid characters in city name!`);
      }

    hideInformation();
    const cityData = await getWeatherData(cityName);
    
    if (cityData.cod === "404") {
      showErrorMessage();
      throw new Error(`Could not find a city with this name!`)
      return;
    }

    cityElement.textContent = cityData.name;
    temperatureElement.textContent = parseInt(cityData.main.temp);
    descriptionElement.textContent = cityData.weather[0].description;
    weatherIconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`
    );
    countryElement.setAttribute(
      "src",
      `https://flagsapi.com/${cityData.sys.country}/flat/64.png`
    );
    humidityElement.innerText = `${cityData.main.humidity}%`;
    windElement.innerText = `${cityData.wind.speed}mph`;

    document.body.style.backgroundImage = `url("${apiUnsplash + cityName}") `;
    weatherContainer.classList.remove("hide");
  } catch (error) {
    console.error(`An error has occurred: ${error.message}`);
  }
};

const clearCityInput = () => {
  cityInput.value = "";
};

// Error handling:
// Function with the objective of removing the "hide" class from the error container, as soon as an error occurs.
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

// Function with the objective of always hiding elements after searching for a city.
const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const checkError = (errorCode) => {
  const errorOptions = {
    404: "400: Bad Request",
    401: "401: Unauthorized",
    403: "403: Forbidden",
    404: "404: Not Found",
    500: "505: Internal Server Error",
    502: "502: Bad Gateway"
  } 

  return errorOptions[errorCode];
}

// Events
// Adding "click" event on the search button to run the "showWeatherData" function whenever the button is clicked!
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const cityName = cityInput.value;
  showWeatherData(cityName);
});

// Adding "keyup" event on city entry to run "showWeatherData" function whenever "Enter" key is pressed.
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const cityName = event.target.value;
    showWeatherData(cityName);
  }
});

// A menu of city suggestions that, as soon as it is clicked, executes the "showWeatherData" function with the name of the chosen city.
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cityName = btn.getAttribute("id");

    showWeatherData(cityName);
  });
});
