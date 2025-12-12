<script setup>
import { ref } from 'vue'
// import BorderLine from './BorderLine.vue'
import WeatherForecastDay from './WeatherForecastDay.vue'
import ForecastNav from './ForecastNav.vue'
import WeatherInfo from './WeatherInfo.vue'
import HourlyChart from './HourlyChart.vue'
// import ForecastTable from './ForecastTable.vue'
import { computed } from 'vue'

const activeSection = ref('today')

const props = defineProps({
  place: Object,
})

// Dynamic background image
const backgroundClass = computed(() => {
  const text = props.place.current.condition.text.toLowerCase()

  if (text.includes('sun')) return 'bg-sunny'
  if (text.includes('cloud')) return 'bg-cloudy'
  if (text.includes('rain')) return 'bg-rainy'
  if (text.includes('drizzle')) return 'bg-rainy'
  if (text.includes('snow')) return 'bg-snow'

  return props.place.current.is_day === 1 ? 'bg-day' : 'bg-night'
})

// Dynamic navigation color based on background image
const navTextClass = computed(() => {
  switch (backgroundClass.value) {
    case 'bg-day':
    case 'bg-sunny':
    case 'bg-cloudy':
    case 'bg-snow':
      return 'text-gray-900' // dark text for light backgrounds
    case 'bg-night':
    case 'bg-rainy':
      return 'text-white' // light text for dark backgrounds
    default:
      return 'text-white'
  }
})

// Dynamic chart labels based on background image
const chartLabelColor = computed(() => {
  switch (backgroundClass.value) {
    case 'bg-day':
    case 'bg-sunny':
    case 'bg-cloudy':
    case 'bg-snow':
      return '#000000' // dark text for light backgrounds
    case 'bg-night':
    case 'bg-rainy':
      return '#ffffff' // light text for dark backgrounds
    default:
      return '#ffffff'
  }
})

// Dynamic Line chart lines based on background image
const chartColors = computed(() => {
  switch (backgroundClass.value) {
    case 'bg-day':
    case 'bg-sunny':
    case 'bg-cloudy':
    case 'bg-snow':
      return { border: '#1c1c1c', background: 'rgba(28, 28, 28, 1)' } // dark text for light backgrounds
    case 'bg-night':
    case 'bg-rainy':
      return { border: '#ffffff', background: 'rgba(255, 255, 255, 1)' } // light text for dark backgrounds
    default:
      return { border: '#64748b', background: 'rgba(100, 116, 139, 1)' } // light text for dark backgrounds
  }
})

// Dynamic 5-Day Forecast font colior based on background image
const tableTextClass = computed(() => {
  switch (backgroundClass.value) {
    case 'bg-day':
    case 'bg-sunny':
    case 'bg-cloudy':
    case 'bg-snow':
      return 'text-gray-900' // dark text for light backgrounds
    case 'bg-night':
    case 'bg-rainy':
      return 'text-white' // light text for dark backgrounds
    default:
      return 'text-white'
  }
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
    <!-- Favorites Button -->
    <div class="flex justify-start mb-1">
      <button
        @click="$emit('save-favorite', place)"
        class="p-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <i class="fa-solid fa-bookmark"></i> Save
      </button>
    </div>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
    <ForecastNav v-model="activeSection" :class="navTextClass" class="mb-8" />

    <!-- Section content -->
    <div class="flex flex items-center justify-center">
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
        <HourlyChart
          :day="place.forecast.forecastday[0]"
          class="w-4/5 max-w-[1000px]"
          :labelColor="chartLabelColor"
          :lineColors="chartColors"
        />
      </div>

      <!-- 5-Day -->
      <div v-if="activeSection === 'fiveDay'" class="w-full">
        <div class="grid grid-rows-5 gap-8">
          <WeatherForecastDay
            v-for="(day, index) in place.forecast.forecastday.slice(0, 5)"
            :key="day.date"
            :day="day"
            :index="index"
            :textClass="tableTextClass"
          />
        </div>
        <!-- <div v-if="activeSection === 'fiveDay'" class="w-full flex items-center justify-center"> -->
        <!-- <ForecastTable :days="place.forecast.forecastday" :tzId="place.location.tz_id" :textClass="tableTextClass"/> -->
      </div>
    </div>

    <!-- weather info card -->
    <Transition name="fade">
      <div v-show="showDetail">
        <WeatherInfo
          :place="place"
          @close-info="showDetail = false"
          @remove-place="removePlace(place.location.name)"
        />
      </div>
    </Transition>

    <!-- Footer buttons -->
    <div class="mt-auto flex justify-between items-center pt-6">
      <!-- weather info btn -->
      <div v-if="activeSection === 'today'" class="absolute bottom-4 left-4 p-2">
        <button @click="showDetail = true">
          More <i class="fa-solid fa-arrow-right text-sm -mb-px"></i>
        </button>
      </div>

      <!-- Trashcan button -->
      <div class="absolute bottom-4 right-4 p-2 hover:bg-white/50">
        <button @click="removePlace(place.location.name)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
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
  background-image: url('./src/images/sunny.png');
}
.bg-cloudy {
  background-image: url('./src/images/cloudy_500.png');
}
.bg-rainy {
  background-image: url('./src/images/rainy.png');
  color: #ffff;
}
.bg-snow {
  background-image: url('./src/images/snow.png');
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
