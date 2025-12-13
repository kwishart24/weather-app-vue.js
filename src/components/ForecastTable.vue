<script setup>
defineProps({
  days: {
    type: Array,
    default: () => [],
  },
  tzId: {
    type: String,
    required: true, // pass place.location.tz_id from parent
  },
  textClass: {
    type: String,
    default: 'text-white',
  },
  fallback: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="bg-white/10 rounded-lg p-6 mt-6 shadow-lg">
    <!-- Dynamic heading -->
    <h2 class="text-xl font-semibold mb-4" :class="textClass">{{ days.length }}-Day Forecast</h2>

    <!-- Fallback banner -->
    <div
      v-if="fallback"
      class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4"
    >
      Showing 3‑day forecast (5‑day data unavailable).
    </div>

    <!-- Dynamic grid: show up to 5 if available, otherwise whatever length -->
    <div
      :class="[
        'grid gap-4 grid-cols-1 sm:grid-cols-2',
        days.length >= 5 ? 'sm:grid-cols-2 md:grid-cols-5' : 'sm:grid-cols-2 md:grid-cols-3',
      ]"
      role="group"
    >
      <div
        v-for="(day, index) in days"
        :key="day.date"
        class="bg-white/20 rounded-lg p-4 text-center flex flex-col items-center"
        :aria-label="`Forecast for ${new Date(day.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: tzId })}`"
      >
        <!-- Date / Today Label -->
        <p class="text-sm font-medium text-100 mb-2" :class="textClass">
          {{
            index === 0
              ? 'Today'
              : new Date(day.date_epoch * 1000).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  timeZone: tzId,
                })
          }}
        </p>

        <!-- Icon -->
        <img :src="day.day.condition.icon" :alt="day.day.condition.text" class="w-12 h-12 mb-2" />

        <!-- Condition -->
        <p class="text-sm mb-2" :class="textClass">{{ day.day.condition.text }}</p>

        <!-- Temps -->
        <div class="flex justify-center gap-0" :class="textClass">
          <span class="font-bold" :class="textClass">{{ Math.round(day.day.maxtemp_f) }}° </span>
          <span class="text-300" :class="textClass">/{{ Math.round(day.day.mintemp_f) }}°</span>
        </div>

        <!-- Rain -->
        <!-- <p class="text-xs text-200 mt-2" :class="textClass">💧 {{ day.day.totalprecip_in }} in</p> -->
      </div>
    </div>
  </div>
</template>
