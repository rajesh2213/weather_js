//weatherUI.js
import { weatherIcons } from "./weatherIcons";

export const renderDisplay = (data) => {
  const selectorObj = selectors();
  try {
    document.querySelector(".overview-wrap img").src = weatherIcons[data.icon];
    document.querySelector(".sunrise-wrap img").src = weatherIcons.sunrise;
    document.querySelector(".sunset-wrap img").src = weatherIcons.sunset;
    document.querySelector(".humidity-wrap img").src = weatherIcons.humidity;
    document.querySelector(".precip-wrap img").src =
      weatherIcons["precipitation"];
    document.querySelector(".windspeed-wrap img").src =
      weatherIcons["windspeed"];

    const currentHour = new Date().toLocaleString("en-US", {
      timeZone: data.timezone,
      hour: "2-digit",
      hour12: false,
    });
    if (currentHour >= 6 && currentHour <= 12) {
      document.documentElement.style.setProperty(
        "--current-time",
        "var(--morning)"
      );
    } else if (currentHour > 12 && currentHour <= 18) {
      document.documentElement.style.setProperty(
        "--current-time",
        "var(--afternoon)"
      );
    } else if (currentHour > 18 && currentHour <= 23) {
      document.documentElement.style.setProperty(
        "--current-time",
        "var(--evening)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--current-time",
        "var(--night)"
      );
    }
  } catch (err) {
    console.log(err);
  }
  for (let key in selectorObj) {
    selectorObj[key].innerText = data[key];
  }
};

function selectors() {
  return {
    location: document.querySelector("#location"),
    temp: document.querySelector("#temp"),
    condition: document.querySelector("#condition"),
    sunrise: document.querySelector("#sunrise"),
    sunset: document.querySelector("#sunset"),
    humidity: document.querySelector("#humidity"),
    precip: document.querySelector("#precip"),
    windspeed: document.querySelector("#windspeed"),
  };
}
