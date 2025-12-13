<script setup>
// Props: allow parent to control active section
const props = defineProps({
  modelValue: {
    type: String,
    default: 'today',
  },
  forecastDays: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['update:modelValue'])

const setActive = (section) => {
  emit('update:modelValue', section)
}
</script>

<template>
  <!-- Navigation Landmark -->
  <nav class="flex gap-10 justify-center mt-6" aria-label="Weather forecast navigation">
    <!-- Today -->
    <button
      class="flex flex-col items-center group cursor-pointer"
      @click="setActive('today')"
      :aria-pressed="props.modelValue === 'today'"
    >
      <i
        class="fa-solid fa-sun text-4xl transition-transform duration-200 group-hover:scale-125 group-hover:text-yellow-500"
        :class="{ 'text-yellow-500 scale-125': props.modelValue === 'today' }"
        aria-hidden="true"
      ></i>
      <span
        class="mt-2 text-sm group-hover:text-yellow-300"
        :class="{ 'text-yellow-300 font-semibold': props.modelValue === 'today' }"
      >
        Today
      </span>
    </button>

    <!-- Hourly -->
    <button
      class="flex flex-col items-center group cursor-pointer"
      @click="setActive('hourly')"
      :aria-pressed="props.modelValue === 'hourly'"
    >
      <i
        class="fa-solid fa-clock text-4xl transition-transform duration-200 group-hover:scale-125 group-hover:text-blue-500"
        :class="{ 'text-blue-500 scale-125': props.modelValue === 'hourly' }"
        aria-hidden="true"
      ></i>
      <span
        class="mt-2 text-sm group-hover:text-blue-300"
        :class="{ 'text-blue-300 font-semibold': props.modelValue === 'hourly' }"
      >
        Hourly
      </span>
    </button>

    <!-- Multi-Day Forecast -->
    <button
      v-if="props.forecastDays > 1"
      class="flex flex-col items-center group cursor-pointer"
      @click="setActive('fiveDay')"
      :aria-pressed="props.modelValue === 'fiveDay'"
    >
      <i
        class="fa-solid fa-calendar-days text-4xl transition-transform duration-200 group-hover:scale-125 group-hover:text-green-500"
        :class="{ 'text-green-500 scale-125': props.modelValue === 'fiveDay' }"
        aria-hidden="true"
      ></i>
      <span
        class="mt-2 text-sm group-hover:text-green-300"
        :class="{ 'text-green-300 font-semibold': props.modelValue === 'fiveDay' }"
      >
        {{ props.forecastDays }}-Day
      </span>
    </button>
  </nav>
</template>
