//index.js
import "./style.css";
import { renderDisplay } from "./weatherUI";

async function fetchWeatherData(city) {
  try {
    const key = "SFLXZSS6D2JHTK7L2W83ZVYAZ";
    const fetchData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`
    );
    const fetchDataToJson = await fetchData.json();
    return fetchDataToJson;
  } catch (err) {
    console.log(`getWeatherDate ERROR : ${err}`);
    alert('City invalid')
  }
}

async function getWeatherDate(city) {
    const loadingElement = document.querySelector('#loading')
    const overview = document.querySelector('.overview-wrap')
    const dayCycle = document.querySelector('.day-cycle')
    const humidity = document.querySelector('.humidity-wrap')
    const precip = document.querySelector('.precip-wrap')
    const windspeed = document.querySelector('.windspeed-wrap')
    loadingElement.style.display = 'block';


    try {

    const weatherData = await new Promise((resolve) =>{
        setTimeout(async ()=>{
            const data = await fetchWeatherData(city);
            resolve(data)
        }, 500)
    })
    const {
      address: location,
      timezone,
      currentConditions: {
        conditions: condition,
        icon,
        sunrise,
        sunset,
        temp,
        humidity,
        precip,
        windspeed,
      },
      days,
    } = weatherData;
    const data = {
      location,
      timezone,
      condition,
      icon,
      sunrise,
      sunset,
      temp,
      humidity,
      precip,
      windspeed,
    };
    renderDisplay(data);
  } catch (error) {
    console.log(error);
  }finally{
    loadingElement.style.display = 'none';
  }
}

function getInput(e) {
  e.preventDefault();
  const form = document.querySelector("form");
  const city = form.inputCity.value;
  console.log(city);
  const test = getWeatherDate(city).catch((err) => {
    console.log(`Error fetching location : ${err}`);
  });
}

getWeatherDate("chennai");
document
  .querySelector("#submit-btn")
  .addEventListener("click", (e) => getInput(e));
