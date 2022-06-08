export default function GetForecastData(latitude, longitude, setWeather) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=2982661ace62ec16bfa0ef3a7ef16e67&units=metric&lang=fr`
  )
    .then((result) => result.json())
    .then((json) => {
      setWeather(json);
    })
    .catch((error) => console.error(error));
}
