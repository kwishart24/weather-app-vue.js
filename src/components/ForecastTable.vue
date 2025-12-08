<script setup>
defineProps({
  days: Array, // array of forecastday objects
})
</script>

<template>
  <div class="bg-white/10 rounded-lg p-6 mt-6 shadow-lg">
    <h2 class="text-xl font-semibold mb-4 text-white">5‑Day Forecast</h2>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div
        v-for="day in days"
        :key="day.date"
        class="bg-white/20 rounded-lg p-4 text-center flex flex-col items-center"
      >
        <!-- Date -->
        <p class="text-sm font-medium text-indigo-100 mb-2">
          {{ new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}
        </p>

        <!-- Icon -->
        <img :src="day.day.condition.icon" :alt="day.day.condition.text" class="w-12 h-12 mb-2" />

        <!-- Condition -->
        <p class="text-sm text-white mb-2">{{ day.day.condition.text }}</p>

        <!-- Temps -->
        <div class="flex justify-center gap-2 text-white">
          <span class="font-bold">{{ Math.round(day.day.maxtemp_f) }}°</span>
          <span class="text-gray-300">/ {{ Math.round(day.day.mintemp_f) }}°</span>
        </div>

        <!-- Rain -->
        <p class="text-xs text-indigo-200 mt-2">
          💧 {{ day.day.totalprecip_in }} in
        </p>
      </div>
    </div>
  </div>
</template>
