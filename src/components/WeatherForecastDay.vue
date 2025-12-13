<script setup>
defineProps({
  day: Object,
})
</script>

<template>
  <div class="mb-2 flex items-center justify-between font-bold">
    <table class="w-full" aria-label="Daily forecast">
      <thead class="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Condition</th>
          <th scope="col">High / Low Temperature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- day of the week -->
          <th scope="row" class="w-1/3">
            {{ new Date(day.date).toLocaleString('en-us', { weekday: 'long' }) }}
          </th>

          <!-- icon -->
          <td class="w-1/3">
            <img
              :src="day.day.condition.icon"
              :alt="day.day.condition.text"
              width="30"
              class="mx-auto"
            />
          </td>

          <!-- high/low temp -->
          <td class="w-1/3 text-center">
            <span aria-label="`High ${Math.round(day.day.maxtemp_f)} degrees Fahrenheit`"
              >{{ Math.round(day.day.maxtemp_f) }}°</span
            >
            /
            <span aria-label="`Low ${Math.round(day.day.mintemp_f)} degrees Fahrenheit`"
              >{{ Math.round(day.day.mintemp_f) }}°</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
