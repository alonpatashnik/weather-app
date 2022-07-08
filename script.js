//initializing variables to be used later
var cityInput = document.getElementById("userCity");
var search = document.getElementById("searchBtn");
var currentWeatherContainer = document.getElementById('currentWeather');
var fiveDayContainer = document.getElementById('fiveDay');
var historyContainer = document.getElementById('searchHistory')
var momentNow = moment().format("MMM Do YY");
var todayDate = moment();
var cityNames = JSON.parse(localStorage.getItem('citySearches')) || [];


//function 
function renderWeather() {
    historyContainer.innerHTML = ""
    currentWeatherContainer.innerHTML = ""
    fiveDayContainer.innerHTML = ""
    var city = cityInput.value;
    fetchLatLon(city);
    storeSearch(city);
}

function fetchLatLon(cityName) {
fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
cityName +
"&appid=328a2ebf7df119aa25eb22c91cf23a26"
)
    .then((respone) => respone.json())
    .then((data) => {
        oneCall(data[0].lat, data[0].lon, data[0].name)
    })
    .catch((err) => alert("Worng city name!"));
}

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
    });
}

function displayCurrentWeather(current, city){
    console.log(current, city);

// create variables for all temp elements.
var card = document.createElement('div')
var cardHeader = document.createElement('div')
var weatherAttributes = document.createElement('ul')
var li1 = document.createElement('li')
var li2 = document.createElement('li')
var li3 = document.createElement('li')
var li4 = document.createElement('li')

// add attributes for styling to the newly created elements
card.setAttribute('class', 'card')
cardHeader.setAttribute('class', 'card-header')




cardHeader.textContent =  city + ' ' + todayDate.format("MMM Do YY")

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

function fiveDay(daily, city){
console.log(daily, city)
for (var i = 0; i < 5; i++){
    todayDate = moment();
    var dateFive = todayDate.add(i+1, 'days').format("MMM Do YY");

    var cardFive = document.createElement('div')
    var cardHeaderFive = document.createElement('div')
    var weatherAttributesFive = document.createElement('ul')
    var li1Five = document.createElement('li')
    var li2Five = document.createElement('li')
    var li3Five = document.createElement('li')
    var li4Five = document.createElement('li')

    cardFive.setAttribute('class', 'card', 'col')
    cardHeaderFive.setAttribute('class', 'card-header', 'col')
    cardHeaderFive.textContent =  city + ' ' + dateFive
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

function storeSearch(city) {
    console.log(city);
    cityNames.push(city)
    localStorage.setItem('citySearches', JSON.stringify(cityNames))
    displaySearchHistory(cityNames, city)
}

function displaySearchHistory(history, city) {
    if (history.length > 10) {
        for (var i = 0; i<10; i++) {
            cityInput.textContent = ""
            var cityList = document.createElement('ul')
            var cityItem = document.createElement('li')
            var oldCityBtn = document.createElement('button')
            cityList.setAttribute('class', 'list-group', 'list-group-flush', 'text-left')
            cityItem.setAttribute('class', 'list-group-item')
            oldCityBtn.setAttribute('id', "city-search")
            oldCityBtn.setAttribute('class', "btn")
            oldCityBtn.setAttribute('type', "button")
            var historyItem = history[(history.length - i)]
            oldCityBtn.textContent = historyItem
            cityItem.append(oldCityBtn);
            cityList.append(cityItem)
            historyContainer.append(cityList);
            oldCityBtn.addEventListener('click', function() {
                var newCity = historyItem
                cityInput.value = newCity
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
            cityItem.textContent = history[(history.length - i)]
            cityItem.append(oldCityBtn);
            cityList.append(cityItem);
            historyContainer.append(cityList);
        }
    }
}

search.addEventListener("click", renderWeather);
