var cel= true;

//get coordinates of current location
$(function() {
  $.getJSON("https://ipinfo.io", function(data) {
    var coordinates = data.loc.split(",");

    //call FCC weather API
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + coordinates[0] + "&lon=" + coordinates[1], function(weatherData) {

      //toggle and display temp from Celsius/Fahrenheit
      function displayTemp(temp, c) {
        if(!c) {
          return Math.round((temp * (9/5) + 32)) + "°F";
        } else {
          return Math.round(temp) + "°C";
        }
      }
      $("#toggle").click(function() {
        cel = !cel;
        var changedTemp = displayTemp(weatherData.main.temp, cel);
        $("#temperature").html(changedTemp);
      })

      var currentLocation = weatherData.name;
      var currentWeather = weatherData.weather[0].description;
      var currentTemp = weatherData.main.temp;
      var weatherIcon = weatherData.weather[0].icon;

      //display weather data
      $("#location").html(currentLocation);
      $("#weather").html(currentWeather);
      $("#temperature").html(Math.round(currentTemp) + "°C");
      $("#weatherIcon").append("<img src=" + weatherIcon + "/>");
    })
  })
})
