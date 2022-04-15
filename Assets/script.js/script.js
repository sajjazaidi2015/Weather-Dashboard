let $searchButton = $("#searchBtn");
let $cityName = $("#enterCity");
let $searchHistory = $("#searchHistory");
let $cityDetail = $("#cityDetail");
let $fiveDay = $("#fiveDay")
let currentDate = moment().format('l');

$searchButton.on("click", function () {
  console.log($cityName.val());
  let cityName = $cityName.val();
  let $li = $("<li>");
  $li.text(cityName);
  $searchHistory.append($li);

  let requestUrl =
    "https://app-weather-update.herokuapp.com/getLocations?location=" +
    cityName;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lat = data[0].coord["lat"];
      let lon = data[0].coord["lon"];
      console.log(lat);
      console.log(lon);

      let url =
        "https://app-weather-update.herokuapp.com/details?lat=" +
        lat +
        "&lon=" +
        lon +
        "&unit=";
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          $cityDetail.html('')
          console.log(data);
          let $h2 = $("<h2>");
          $h2.text(cityName);
          $cityDetail.append($h2);
          let $h3 = $("<h2>");
          $h3.text(currentDate);
          $cityDetail.append($h3);
          let pEl = $("<p>")
          pEl.text('Temp: ' + data.current.temp + String.fromCharCode(176) + "F")
          $cityDetail.append(pEl)
          let pE2 = $("<p>")
          pE2.text('Wind: ' + data.current.wind_speed + " MPH")
          $cityDetail.append(pE2)
          let pE3 = $("<p>")
          pE3.text('Humidity: ' + data.current.humidity + " %")
          $cityDetail.append(pE3)
          let pE4 = $("<p>")
          pE4.text('UVI Index: ' + data.current.uvi)
          $cityDetail.append(pE4)
          var dataLength = 5
          $fiveDay.html('')
          for (i=0; i<dataLength; i++){
            console.log(data.daily[i])
            const $divDay = $("<div>", {class: "card"})
            // let imgEl = $(`<img src='${data.daily[i].clouds}'>`)
            //  http://openweathermap.org/img/wn/10d@2x.png
            // $divDay.append(imgEl)
            let h1El = $('<h1>')
            const date = moment.unix(data.daily[i].dt).tz(data.daily[i].timezone).format('MM/DD/YYYY');
            h1El.text(date)
            $divDay.append(h1El)
            $fiveDay.append($divDay)
            let pEl = $("<p>")
            pEl.text('Temp: ' + data.daily[i].temp.day + String.fromCharCode(176) + "F")
            console.log(pEl)
            $divDay.append(pEl)
            $fiveDay.append($divDay)
            let pE2 = $("<p>")
            pE2.text('Wind: ' + data.daily[i].wind_speed + " MPH")
            $divDay.append(pE2)
            $fiveDay.append($divDay)
            let pE3 = $("<p>")
            pE3.text('Humidity: ' + data.daily[i].humidity + " %")
            $divDay.append(pE3)
            $fiveDay.append($divDay)
          }

        });
    });
});
