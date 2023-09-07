# Weather App Documentation

## Introduction
This documentation provides an in-depth explanation of the Weather App, a JavaScript application designed to fetch and display weather information for a specified city. The app utilizes the OpenWeatherMap API and includes features such as live weather data, error handling, and city suggestions.

![preview-image](https://github.com/privateaz/WeatherApp/assets/112028952/2e75ba64-6ec1-44b1-adb5-55a4f95bce5e)

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Code Structure](#code-structure)
4. [Functions](#functions)
5. [Error Handling](#error-handling)
6. [Event Listeners](#event-listeners)
7. [City Suggestions](#city-suggestions)

## Prerequisites
Before using the Weather App, ensure you have the following in place:

- Node.js installed on your machine.
- An API key from [OpenWeatherMap](https://openweathermap.org/) to access weather data.

## Getting Started
1. Clone the Weather App repository from GitHub.
2. Create a `.env` file in the project directory and add your OpenWeatherMap API key:
   ```shell
   API_KEY=your_api_key_here
   ```
3. Run the app using a local server or a development environment.

## Code Structure
The Weather App code is organized into sections for better readability and maintainability:

### Variables
- `apiKey`: Stores the API key obtained from the `.env` file.
- `apiUnsplash`: URL for fetching background images related to the city.
- Various elements: Selectors for HTML elements used in the app.

### Functions
- `toggleLoader`: Toggles the visibility of the loader icon during API requests.
- `getWeatherData`: Fetches weather data for a specified city from OpenWeatherMap.
- `showWeatherData`: Displays weather information for the specified city.
- `showErrorMessage`: Displays error messages.
- `hideInformation`: Hides information elements on the page.

### Event Listeners
- `click` event on the search button triggers `showWeatherData` when clicked.
- `keyup` event on the city input field triggers `showWeatherData` when the "Enter" key is pressed.

### City Suggestions
- Clicking on a suggestion button executes `showWeatherData` with the selected city name.

## Functions

### `toggleLoader()`
- Description: This function toggles the visibility of the loader icon to indicate loading during API requests.
- Usage: Called within `getWeatherData()` to show and hide the loader icon.

### `getWeatherData(cityName)`
- Description: Fetches weather data for the specified city from the OpenWeatherMap API.
- Parameters:
  - `cityName` (string): The name of the city for which weather data is requested.
- Returns: A promise that resolves with the weather data.
- Usage: Called within `showWeatherData()` to retrieve weather information.

### `showWeatherData(cityName)`
- Description: Displays weather information for the specified city.
- Parameters:
  - `cityName` (string): The name of the city for which weather data is displayed.
- Usage: Called in response to user input or city suggestion clicks to update the displayed weather information.

### `showErrorMessage()`
- Description: Displays the error message container by removing the "hide" class.
- Usage: Called when an error occurs, such as when the specified city is not found.

### `hideInformation()`
- Description: Hides various information elements on the page by adding the "hide" class.
- Usage: Called to reset the page's display before showing new weather information or error messages.

## Error Handling
The Weather App includes error handling for situations where the specified city is not found (HTTP code 404). When this occurs, the `showErrorMessage` function is called to display an error message to the user.

## Event Listeners
The app includes event listeners to enhance user interaction:

- `click` event on the search button triggers `showWeatherData` when clicked.
- `keyup` event on the city input field triggers `showWeatherData` when the "Enter" key is pressed.

## City Suggestions
The app provides city suggestions that allow users to quickly access weather information for specific cities. Clicking on a suggestion button executes `showWeatherData` with the name of the chosen city.

---
This documentation provides a comprehensive overview of the Weather App's functionality, code structure, and usage. It serves as a valuable resource for developers working with the Weather App codebase.
