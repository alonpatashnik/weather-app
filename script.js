var cityInput = document.getElementById("userCity");
var search = document.getElementById("searchBtn");
var currentWeatherContainer = document.getElementById('currentWeather');
var fiveDayContainer = document.getElementById('fiveDay');

function renderWeather() {
  var city = cityInput.value;
  fetchLatLon(city);
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
        fiveDay(data.daily)
    });
}

function displayCurrentWeather(current, city){
    console.log(current, city);
// js date function MM/DD/YYYY
var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth()+1).padStart(2, '0');
var yyyy = date.getFullYear();

date = mm + '/' + dd + '/'+ yyyy;






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




cardHeader.textContent =  city + ' ' + date.toLocaleString('en-US')

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

function fiveDay(daily){
    console.log(daily)
}

search.addEventListener("click", renderWeather);
