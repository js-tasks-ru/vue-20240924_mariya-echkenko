import {defineComponent} from 'vue'
import {getWeatherData, WeatherConditionIcons} from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup () {
    function formatTemp(temp) {
      return (temp - 273.15).toFixed(1)
    }

    function formatPressure(pressure) {
      return Math.round(pressure * 0.75)
    }

    function formatTimeToMinute (time) {
      const timeArr = time.split(':').map(Number);
      return timeArr[0] * 60 + timeArr[1];
    }

    function checkNight (dt, sunrise, sunset) {
      const formatDt = formatTimeToMinute(dt);
      const formatSunrise = formatTimeToMinute(sunrise);
      const formatSunset = formatTimeToMinute(sunset);

      return formatDt < formatSunrise || formatDt > formatSunset;
    }

    return {
      weatherData: getWeatherData(),
      weatherIcons : WeatherConditionIcons,
      formatTemp,
      formatPressure,
      checkNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData"
            :class="['weather-card', {'weather-card--night': checkNight(item.current.dt, item.current.sunrise, item.current.sunset)}]">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description"> {{ weatherIcons[item.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ formatTemp(item.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ formatPressure(item.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
