<script setup>
defineProps({
  days: {
    type: Array,
    default: () => []
  },
  tzId: {
    type: String,
    required: true // pass place.location.tz_id from parent
  },
  textClass: {
    type: String,
    default: 'text-white'
  }
})
</script>

<template>
  <div class="bg-white/10 rounded-lg p-6 mt-6 shadow-lg">
    <h2 class="text-xl font-semibold mb-4" :class="textClass">5‑Day Forecast</h2>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div
        v-for="(day, index) in days.slice(0,5)"
        :key="day.date"
        class="bg-white/20 rounded-lg p-4 text-center flex flex-col items-center"
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
