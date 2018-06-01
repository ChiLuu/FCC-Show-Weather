$(document).ready(function() {

    var latitude = 0;
    var longitude = 0;
    var tempC = 0;
    var tempF = 0;

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $(".weather-header").html("Geolocation is not supported by this browser.");
        }
    };

    function showPosition(position) {
        latitude = position.coords.latitude; 
        longitude = position.coords.longitude;

        $(".lat").html("Latitude: <b>" + (Math.round(latitude * 100)/100) + "</b>");
        $(".lon").html("Longitude: <b>" + (Math.round(longitude * 100)/100) + "</b>");

        getData();
    };

    function getData() {
        $.ajax({
            type: 'GET',
            url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude,
            success: function(data) {
                tempC = data.main.temp; 
                tempF = (data.main.temp *9/5) + 32 ;
                $(".city").html("<h4>City: <b>" + data.name + ", " + data.sys.country + "</b></h4>");
                $(".temperature").html("<h4>Temp: <b>" + tempC + "ºC</b></h4>");
                $(".weather").html("<h5>Current Weather: <b>" + data.weather[0].main + "</b></h5>");
                $(".weather-details").html("<h5>Details: <b>" + data.weather[0].description + "</b></h5>");
                $(".wind").html("<h5>Wind: <b>" + data.wind.speed + "km/hr</b></h5>");
                $(".humidity").html("<h5>Humidity: <b>" + data.main.humidity + "%</b></h5>");
                $(".weather-icon").html('<img class="weather-icon" src="' + data.weather[0].icon + '" alt="weather icon">');
                
            }
        });
    };
    $(document).on('click', ".convert-temp-f", function() {
          $(".temperature").html("<h4>Temp: <b>" + tempF + "ºF</b></h4>");
          $(this).html("Convert to ºC");
          $(this).addClass("convert-temp-c");
          $(this).removeClass("convert-temp-f");
        }
    );

    $(document).on('click', ".convert-temp-c", function() {
        $(".temperature").html("<h4>Temp: <b>" + tempC + "ºC</b></h4>");
        $(this).html("Convert to ºF");
        $(this).addClass("convert-temp-f");
        $(this).removeClass("convert-temp-c");
      }
  ); 
});
