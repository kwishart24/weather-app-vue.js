<script setup>
import { ref } from 'vue'
// import BorderLine from './BorderLine.vue'
// import WeatherForecastDay from './WeatherForecastDay.vue'
import ForecastNav from './ForecastNav.vue'
import WeatherInfo from './WeatherInfo.vue'
import HourlyChart from './HourlyChart.vue'
import ForecastTable from './ForecastTable.vue'
import { computed } from 'vue'

const activeSection = ref('today')

const props = defineProps({
  place: Object,
})

const backgroundClass = computed(() => {
  const text = props.place.current.condition.text.toLowerCase()

  if (text.includes('sun')) return 'bg-sunny'
  if (text.includes('cloud')) return 'bg-cloudy'
  if (text.includes('rain')) return 'bg-rainy'
  if (text.includes('snow')) return 'bg-snow'

  return props.place.current.is_day === 1 ? 'bg-day' : 'bg-night'
})

const emit = defineEmits(['delete-place'])

const showDetail = ref(false)

const removePlace = (placeName) => {
  emit('delete-place', placeName)
  showDetail.value = false
}
</script>

<template>
  <!-- <div
    :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'"
    class="text-white p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden"
  > -->

  <div
    :class="[
      backgroundClass,
      'bg-cover bg-center transition-all duration-500 p-6 rounded-lg shadow-lg gap-6 mt-5 mb-0 relative overflow-hidden flex flex-col',
    ]"
    class="min-h-[700px]"
  >
    <!-- Header -->
    <div class="mb-2 flex justify-between items-center">
      <!-- Location & time -->
      <div class="flex items-center justify-center gap-2">
        <i class="fa-solid fa-location-dot"></i>
        <h1 class="text-3xl">{{ place.location.name }}</h1>
      </div>
      <div class="flex items-center justify-center gap-2">
        <i class="fa-solid fa-clock"></i>
        <h1 class="text-3xl">
          {{
            new Date(place.location.localtime).toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </h1>
      </div>
    </div>

    <!-- Navigation -->
    <ForecastNav v-model="activeSection" />

    <!-- Section content -->
    <div class="flex-1 flex items-center justify-center">
      <!-- Today -->
      <div v-if="activeSection === 'today'" class="text-center">
        <!-- current weather -->
        <div v-if="activeSection === 'today'" class="text-center">
          <img :src="place.current.condition.icon" alt="icon" class="w-32 mx-auto -mb-4" />
          <h1 class="text-9xl mb-2 ml-8">{{ Math.round(place.current.temp_f) }}&deg;</h1>
          <h6 class="text-2xl mb-2">
            {{ Math.round(place.forecast.forecastday[0].day.maxtemp_f) }}&deg;F /
            {{ Math.round(place.forecast.forecastday[0].day.mintemp_f) }}&deg;F
          </h6>
          <p class="text-2xl">{{ place.current.condition.text }}</p>
        </div>
      </div>

      <!-- Hourly -->
      <div v-if="activeSection === 'hourly'" class="w-full flex items-center justify-center">
        <div class="flex-1 flex items-center justify-center">
          <HourlyChart :day="place.forecast.forecastday[0]" class="max-w-[7/8]] max-h-[4/5]" />
        </div>
      </div>

      <!-- 5-Day -->
      <div v-if="activeSection === 'fiveDay'" class="w-full flex items-center justify-center">
        <ForecastTable :days="place.forecast.forecastday" :tzId="place.location.tz_id" />
      </div>
    </div>

    <!-- Footer info -->
    <Transition name="fade">
      <div v-show="showDetail">
        <WeatherInfo
          :place="place"
          @close-info="showDetail = false"
          @remove-place="removePlace(place.location.name)"
        />
      </div>
    </Transition>

    <!-- forecast btn -->
    <div v-if="activeSection === 'today'" class="flex justify-end items-center gap-1 mt-10">
      <button @click="showDetail = true">
        More <i class="fa-solid fa-arrow-right text-sm -mb-px"></i>
      </button>
    </div>

    <!-- hourly charts -->
    <!-- <div v-show="showDetail">
      <HourlyChart
        v-if="place.forecast && place.forecast.forecastday.length"
        :day="place.forecast.forecastday[0]"
      />
    </div> -->
  </div>
</template>

<style scoped>
.bg-sunny {
  background-image: url('public/images/sunny.png');
}
.bg-cloudy {
  background-image: url('public/images/cloudy_500.png');
}
.bg-rainy {
  background-image: url('public/images/rainy.png');
}
.bg-snow {
  background-image: url('public/images/snow.png');
}

.bg-day {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}

.bg-night {
  background-color: #07223d;
  background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
  color: #ffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
