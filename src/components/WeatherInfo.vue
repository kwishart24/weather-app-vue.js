<script setup>
defineProps({
  place: Object,
})
</script>

<template>
  <div
    class="absolute bg-white/80 backdrop-blur-sm text-slate-900 inset-x-0 bottom-0 rounded-t-lg p-8"
    role="dialog"
    aria-modal="true"
    aria-labelledby="weather-info-title"
  >
    <!-- Hidden Header for screen readers -->
    <h2 id="weather-info-title" class="sr-only">Weather details for {{ place.location.name }}</h2>

    <!-- Close button -->
    <div class="flex justify-end mb-5">
      <button @click="$emit('close-info')" class="p-1" aria-label="Close weather details">
        <i class="fa-solid fa-xmark text-xl" aria-hidden="true"></i>
      </button>
    </div>

    <!-- More Info Box -->
    <div
      class="flex items-center justify-between gap-6 mb-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="weather-info-title"
      aria-describedby="weather-info-desc"
    >
      <!-- Screen reader only description -->
      <h2 id="weather-info-title" class="sr-only">Weather details for {{ place.location.name }}</h2>
      <p id="weather-info-desc" class="sr-only">
        Current conditions including wind, humidity, precipitation, direction, feels like
        temperature, and UV index.
      </p>

      <!-- Wind speed -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-wind mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`Wind speed ${place.current.wind_mph} miles per hour`"
        >
          {{ place.current.wind_mph }} mph
        </p>
        <p class="text-sm sm:text-base md:text-lg">wind</p>
      </div>
      <!-- Humidity level -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-droplet mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`Humidity ${place.current.humidity} percent`"
        >
          {{ place.current.humidity }}%
        </p>
        <p class="text-sm sm:text-base md:text-lg">humidity</p>
      </div>
      <!-- Precipitation -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-umbrella mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`Precipitation ${place.current.precip_in} inches`"
        >
          {{ place.current.precip_in }} in
        </p>
        <p class="text-sm sm:text-base md:text-lg">precipitation</p>
      </div>
    </div>
    <div class="flex items-center justify-between gap-6 mb-10">
      <!-- Wind direction -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-fan mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`Wind direction ${place.current.wind_dir}`"
        >
          {{ place.current.wind_dir }}
        </p>
        <p class="text-sm sm:text-base md:text-lg">direction</p>
      </div>
      <!-- Feels like -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-temperature-half mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`Temperature feels like ${place.current.feelslike_f} degrees Fahrenheit`"
        >
          {{ Math.round(place.current.feelslike_f) }}&deg;F
        </p>
        <p class="text-sm sm:text-base md:text-lg">feels like</p>
      </div>
      <!-- UV -->
      <div class="text-center flex-1">
        <i class="fa-solid fa-sun mb text-2xl" aria-hidden="true"></i>
        <p
          class="text-xl text-sm sm:text-base md:text-lg font-bold"
          :aria-label="`UV index is ${place.current.UV}`"
        >
          {{ place.current.UV }}
        </p>
        <p class="text-sm sm:text-base md:text-lg">UV index</p>
      </div>
    </div>
    <!-- Last update and delete -->
    <div class="flex justify-between items-center">
      <h3
        class="text-slate-900/50"
        :aria-label="`Last update ${new Date(place.current.last_updated_epoch * 1000).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`"
      >
        last update:
        {{
          new Date(place.current.last_updated_epoch * 1000).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            //timeZone: place.location.tz_id
          })
        }}
      </h3>
    </div>
  </div>
</template>
