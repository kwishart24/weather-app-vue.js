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
      role="alert"
    >
      Showing 3‑day forecast (5‑day data unavailable).
    </div>

    <!-- Forecast table -->
    <div class="flex justify-center items-center">
      <table class="table-fixed text-center w-full text-center" aria-labelledby="forecast-heading">
        <thead>
          <tr>
            <th scope="col" class="p-2">Date</th>
            <th scope="col" class="p-2">Condition</th>
            <th scope="col" class="p-2">High / Low</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(day, index) in days"
            :key="day.date"
            :aria-label="`Forecast for ${new Date(day.date_epoch * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: tzId })}`"
          >
            <!-- Date -->
            <td class="p-2">
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
            </td>

            <!-- Condition -->
            <td class="p-2">
              <img
                :src="day.day.condition.icon"
                :alt="day.day.condition.text"
                class="inline-block w-8 h-8 mr-2"
              />
              {{ day.day.condition.text }}
            </td>

        <!-- Temps -->
        <td class="text-center flex justify-center gap-0" :class="textClass">
          {{ Math.round(day.day.maxtemp_f) }}° /{{ Math.round(day.day.mintemp_f) }}°
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
