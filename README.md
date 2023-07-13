# Challenge-6-Weather-Dashboard
## Link to application 
https://seanye333.github.io/Challenge-6-Weather-Dashboard/ 

## Description
This repository contains the code to see the weather outlook for multiple cities by using weather forecast API.

To use the website - Please input your city to the search box to display current weather and 5 days weather for the city. The displayed parameters include temperature, wind speed, weather icon, etc. All saved history search will save to the local sotrage and display on the search hisory list. Double click on the history saved city to swap into historical searched city on the list. To clear the local storage, please use the inspect function (application).    

The sequence of operation is described below: 
1. Call API key from OpenWeatherMap.org
2. Fetch weather data for a city
3. Display current weather 
4. Display 5-day forecast 
5. Display search history
6. Handle user input "city" submission
7. Handle click on search history
8. Add a city to search history
9. Initialize the weather dashboard

From this assignment: I learned how to store data to local storage, persist the saved local storage, apply API etc. 

## Installation
To install this project within your computer, please follow the instruction below
1. Open git bash
2. Create your own file
3. To clone the repository: type in git clone https://github.com/Seanye333/Challenge-6-Weather-Dashboard/
4. Navigate to the project directory: cd <project_directory>
5. Open the file in the web browser: open index.html
6. Website will display on your default browser

## Usage
Please open the HTML file (index.html) in a web browser to view the homepage. The CSS file (style.css) and javascript file are referenced in the HTML file and automatically applied to the webpage in the web browser. The website will be deployed for all users to use by simply copy and paste to browser.

![alt text](images/Challenge-6-Weather-Dashboard-Screenshot.png) 

## Credits
https://openweathermap.org/forecast5#name5

## License
This project is licensed under the MIT License.

## Features
Following features are from original acceptance criteria from the project: 
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## How to Contribute
Contributions to this project are not avaiable currently.
