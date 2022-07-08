//initializing variables to be used later
var cityInput = document.getElementById("userCity");
var search = document.getElementById("searchBtn");
var currentWeatherContainer = document.getElementById('currentWeather');
var fiveDayContainer = document.getElementById('fiveDay');
var historyContainer = document.getElementById('searchHistory')
var momentNow = moment().format("MMM Do YY");
var todayDate = moment();
var cityNames = JSON.parse(localStorage.getItem('citySearches')) || [];


//function  that clears our display area and calls fetchLatLon
function renderWeather() {
    historyContainer.innerHTML = ""
    currentWeatherContainer.innerHTML = ""
    fiveDayContainer.innerHTML = ""
    var city = cityInput.value;
    fetchLatLon(city);
}

//uses geocoding api to get lat and lon of entered city
function fetchLatLon(cityName) {
fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
cityName +
"&appid=328a2ebf7df119aa25eb22c91cf23a26"
)
    .then((respone) => respone.json())
    .then((data) => {
        oneCall(data[0].lat, data[0].lon, data[0].name)
    })
    .catch((err) => alert("Worng city name!"));
}

//uses one call api to return all of our weather data about the city
//this function runs our display current weather, five day forecast, and stores our search history
function oneCall(lat, lon, city) {
fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&units=imperial&appid=328a2ebf7df119aa25eb22c91cf23a26"
)
    .then((respone) => respone.json())
    .then((data) => {
        displayCurrentWeather(data.current, city)
        fiveDay(data.daily, city)
        storeSearch(city);
    });
}

//gathers data passed from previous function to create dynamic html each time a user searchs
function displayCurrentWeather(current, city){
    console.log(current, city);

// create variables for all temp elements.
var card = document.createElement('div')
var cardHeader = document.createElement('div')
var weatherIcon = document.createElement('img')
var weatherAttributes = document.createElement('ul')
var li1 = document.createElement('li')
var li2 = document.createElement('li')
var li3 = document.createElement('li')
var li4 = document.createElement('li')

if (current.uvi <=4) {
    li4.setAttribute('class', "p-3", "mb-2", "bg-success", "text-white")
} else if (current.uvi <=8) {
    li4.setAttribute('class', "p-3", "mb-2", "bg-warning", "text-dark")
} else {
    li4.setAttribute('class', "p-3", "mb-2", "bg-danger", "text-white")
}

// add attributes for styling to the newly created elements
card.setAttribute('class', 'card')
cardHeader.setAttribute('class', 'card-header')
weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+ current.weather[0].icon +'@2x.png')




cardHeader.textContent =  city + ' ' + todayDate.format("MMM Do YY")

cardHeader.append(weatherIcon)

card.append(cardHeader)

currentWeatherContainer.append(card)

weatherAttributes.setAttribute('class', 'list-group', 'list-group-flush', 'text-left')
li1.setAttribute('class', 'list-group-item')
li2.setAttribute('class', 'list-group-item')
li3.setAttribute('class', 'list-group-item')
li4.setAttribute('class', 'list-group-item')



li1.textContent = 'temp: ' + current.temp + ' deg F'
li2.textContent = 'wind: ' + current.wind_speed + ' MPH'
li3.textContent = 'humidity: ' + current.humidity + '%'
li4.textContent = 'UV index: ' + current.uvi

weatherAttributes.append(li1)
weatherAttributes.append(li2)
weatherAttributes.append(li3)
weatherAttributes.append(li4)

card.append(weatherAttributes)
}


//takes in data from onecall function and creates dynamic html for our weather data
function fiveDay(daily, city){
console.log(daily, city)
for (var i = 0; i < 5; i++){
    todayDate = moment();
    var dateFive = todayDate.add(i+1, 'days').format("MMM Do YY");

    var cardFive = document.createElement('div')
    var cardHeaderFive = document.createElement('div')
    var weatherIconFive = document.createElement('img')
    var weatherAttributesFive = document.createElement('ul')
    var li1Five = document.createElement('li')
    var li2Five = document.createElement('li')
    var li3Five = document.createElement('li')
    var li4Five = document.createElement('li')

    cardFive.setAttribute('class', 'card', 'col')
    cardHeaderFive.setAttribute('class', 'card-header', 'col')
    cardHeaderFive.textContent =  city + ' ' + dateFive
    weatherIconFive.setAttribute('src', 'https://openweathermap.org/img/wn/'+ daily[i].weather[0].icon +'@2x.png')

    cardHeaderFive.append(weatherIconFive)
    cardFive.append(cardHeaderFive)
    fiveDayContainer.append(cardFive)

    weatherAttributesFive.setAttribute('class', 'list-group', 'list-group-flush', 'text-left')
    li1Five.setAttribute('class', 'list-group-item')
    li2Five.setAttribute('class', 'list-group-item')
    li3Five.setAttribute('class', 'list-group-item')
    li4Five.setAttribute('class', 'list-group-item')

    li1Five.textContent = 'temp: ' + daily[i].temp.day + ' deg F'
    li2Five.textContent = 'wind: ' + daily[i].wind_speed + ' MPH'
    li3Five.textContent = 'humidity: ' + daily[i].humidity + '%'
    li4Five.textContent = 'UV index: ' + daily[i].uvi

    weatherAttributesFive.append(li1Five)
    weatherAttributesFive.append(li2Five)
    weatherAttributesFive.append(li3Five)
    weatherAttributesFive.append(li4Five)

    cardFive.append(weatherAttributesFive)
}

}

//stores each search to local storage
function storeSearch(city) {
    console.log(city);
    cityNames.push(city)
    localStorage.setItem('citySearches', JSON.stringify(cityNames))
    displaySearchHistory(cityNames, city)
}

//displays the search history as a list
function displaySearchHistory(history, city) {
    var header = document.createElement('div')
    header.textContent = "Search History"
    historyContainer.append(header)
    var cityList = document.createElement('ul')
    cityList.setAttribute('class', 'list-group', 'list-group-flush', 'text-left')
    historyContainer.append(cityList);
    if (history.length > 10) {

        for (var i = 0; i<10; i++) {
            cityInput.textContent = ""
            var cityItem = document.createElement('li')
            var oldCityBtn = document.createElement('button')
            cityItem.setAttribute('class', 'list-group-item')
            oldCityBtn.setAttribute('id', "city-search")
            oldCityBtn.setAttribute('class', "btn")
            oldCityBtn.setAttribute('type', "button")
            oldCityBtn.textContent = history[(history.length - i -1)]
            cityItem.append(oldCityBtn);
            cityList.append(cityItem)
            oldCityBtn.addEventListener('click', function() {
                cityInput.value = oldCityBtn.textContent
                console.log(cityInput.value)
                renderWeather()
            })
        }
    } else {
        for (var i = 0; i<history.length; i++) {
            var cityList = document.createElement('ul')
            var cityItem = document.createElement('li')
            var oldCityBtn = document.createElement('a')
            cityList.setAttribute('class', 'list-group', 'list-group-flush', 'text-left')
            cityItem.setAttribute('class', 'list-group-item')
            oldCityBtn.setAttribute('id', "city-search")
            oldCityBtn.setAttribute('class', "btn")
            oldCityBtn.setAttribute('type', "button")
            oldCityBtn.textContent = history[(history.length - i)]
            cityItem.append(oldCityBtn);
            cityList.append(cityItem);
            historyContainer.append(cityList);
        }
    }
}

search.addEventListener("click", renderWeather);
