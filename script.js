// adding the search button as a global variable to listen to later
var searchButton = document.getElementById("search-button");
let searchCriteria = document.getElementById("search-criteria");
let bigContainer = document.getElementById("one-day-5-day-container");
let historyButtonContainers = document.getElementById("city-button-list");
// setting the 5 day containers and city containers to invisible
bigContainer.style.display = "none";



// function passing in the searchcritera.value from the function init
function getLongAndLat(a){
  // constructing the api call and plugging in the city 
    var LatLonApiCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + a + "&limit=1&appid=45243bff2680411dc8b71cd9714f866f";
    // fetch call plugging in the api call and parsing it. 
    fetch(LatLonApiCall)
    .then(function (response) {
      return response.json();
    })
    // getting the lat and long and plugging it into the get 5 day weather function
    .then(function (data) {
      var latitude = (data[0].lat);
      var longitude = (data[0].lon);
      getWeather5Day(latitude, longitude);
    })
};


let weather5DayData;
// 5 day weather function plugging in the lat and long from function getLatandLong
function getWeather5Day(a, b){
  // constructing the api call and plugging in the a and b, also calling for the imperial system
  var weather5DayApiCall = "http://api.openweathermap.org/data/2.5/forecast?lat=" + a + "&lon=" + b + "&appid=45243bff2680411dc8b71cd9714f866f&units=imperial"
  // fetch call plugging in the api call and parsing it
  fetch(weather5DayApiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      // getting the date and time, first we set the loop equal to the array inside the object
      weather5DayData = data.list;
      console.log(weather5DayData);
      var weather5DayDates = [];
      var weather5DayTemps = [];
      var weather5DayWinds = [];
      var weather5DayHumids = [];
      var emojiWeatherArray = [];
      var convertedEmojiArray = [];
      
      // for each object in the array, loop through (skipping 8 spots each time to equal 5 day forecast)
      for (var i = 0; i < data.list.length; i+=8){
        // grab the date out of the list, convert it from unix code to normal days, then the MM/DD/yyyy format
        // and then save it to an empty array called weather 5daydates
        var current5Day = data.list[i].dt;
        current5Day = dayjs(current5Day * 1000).$d;
        current5Day = dayjs(current5Day).format('MM/DD/YYYY');
        weather5DayDates.push(current5Day);
        // grab the temperature out of the list, add degrees farenheight to it and save it to an empty array
        var temps = data.list[i].main.temp;
        temps = "Temp: " + temps + "°F"
        weather5DayTemps.push(temps);
        // grab the wind mph out of the list, add 'mph' to it, and add it to the empty array
        var winds = data.list[i].wind.speed;
        winds = "Wind: " + winds + " MPH";
        weather5DayWinds.push(winds);
        // grab the humidity out of the list, add '%' to it, and add it to the empty array
        var humidity = data.list[i].main.humidity;
        humidity = "Humidity: " + humidity + "%";
        weather5DayHumids.push(humidity);
      
      
        // adding in emojis depending on the weather
        var emojiWeather = data.list[i].weather[0].main;
        emojiWeatherArray.push(emojiWeather);
      }; 
        // looping through the saved weather statuses and converting them to emojis
        for ( var j = 0; j < emojiWeatherArray.length; j++){
          if (emojiWeatherArray[j] === "Clouds"){
            convertedEmojiArray.push("Cloudy ☁️");
          } else if (emojiWeatherArray[j] == "Rain"){
            convertedEmojiArray.push("Rain 🌨️");
          } else if (emojiWeatherArray[j] === "Clear"){
            convertedEmojiArray.push("Sunny ☀️");
          } else if (emojiWeatherArray[j] === "Snow"){
            convertedEmojiArray.push("Snow ❄️");
          };
        };
      
      // get all of the cards that belong to the five day card class name, to loop through
     let fiveDayCardClass = document.getElementsByClassName("five-day-card");
      //  fiveDayCardClass.style.display = "block";
     for (var i=0; i<fiveDayCardClass.length; i++){
      // adding in the dates, but making sure to erase all the other text content first
      fiveDayCardClass[i].textContent = weather5DayDates[i];
      // adding a line break
      var breaker1 = document.createElement("br");
      fiveDayCardClass[i].appendChild(breaker1);
      // adding in emojis
      var weather5dayEmojiPlacer = document.createTextNode(convertedEmojiArray[i]);
      fiveDayCardClass[i].appendChild(weather5dayEmojiPlacer);
      // adding a line break
      var breaker2 = document.createElement("br");
      fiveDayCardClass[i].appendChild(breaker2);
      // adding in the temps
      var weather5DayTempsPlacer = document.createTextNode(weather5DayTemps[i]);
      fiveDayCardClass[i].appendChild(weather5DayTempsPlacer);
      // adding a line break
      var breaker3 = document.createElement("br");
      fiveDayCardClass[i].appendChild(breaker3);
      // adding in the wind speeds
      var weather5DayWindsPlacer = document.createTextNode(weather5DayWinds[i]);
      fiveDayCardClass[i].appendChild(weather5DayWindsPlacer);
      // adding in the line break
      var breaker4 = document.createElement("br");
      fiveDayCardClass[i].appendChild(breaker4);
      // adding in the humidity
      var weather5DayHumidsPlacer = document.createTextNode(weather5DayHumids[i]);
      fiveDayCardClass[i].appendChild(weather5DayHumidsPlacer);
      };
      // setting the city container and 5 day cards to visible
      bigContainer.style.display = "block";


      // add 1 day forecast here.
    });
};

var searchHistoryArray = [];
function addSearchHistoryButtons(a){
  // creating buttons with the text content that is added inside of the search box
  var historyButtons =document.createElement("button");
  historyButtons.textContent = a;
  historyButtons.classList.add("history-buttons");
  historyButtonContainers.appendChild(historyButtons);
  // adding content inside of the search box to local storage
  searchHistoryArray.push(a);
  console.log(searchHistoryArray);
  localStorage.setItem( "past searches", JSON.stringify(searchHistoryArray));
};
console.log(searchHistoryArray);
// localStorage.setItem( "past searches", JSON.stringify(searchHistoryArray));
// pulling history from local storage and setting them as buttons
var retrievedHistory = localStorage.getItem("past searches");
var retrievedHistory = JSON.parse(retrievedHistory);

// initializing function to set values and call two functions
function init(){
  getLongAndLat(searchCriteria.value);
  addSearchHistoryButtons(searchCriteria.value);
};
// initializing the getlongandlat function and plugging in the text content of the button clicked on
function historyInit(event){
  var buttonTextContent = event.target.textContent;
  getLongAndLat(buttonTextContent);
};

// listening for the search button and calling init
searchButton.addEventListener("click", init);

// for the amount of items in the retrieved search history, add a button with the text content
for ( i = 0; i < retrievedHistory.length; i++){
  var historyButtons =document.createElement("button");
  historyButtons.textContent = retrievedHistory[i];
  historyButtons.classList.add("history-buttons");
  historyButtonContainers.appendChild(historyButtons);
};
// adding an event listener to the history buttons section
historyButtonContainers.addEventListener("click", historyInit);













