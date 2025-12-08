<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Chart } from 'vue-chartjs'
import { ref } from 'vue'
import { watch } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
)

const props = defineProps({
  day: Object,
})

const loaded = ref(false)

const chartData = ref({
  data: {
    labels: [],
    datasets: [
      {
        label: 'Hourly Temperature (°F)',
        type: 'line',
        data: [],
        //backgroundColor: 'rgba(54, 73, 93, 0)',
        backgroundColor: 'rgba(9, 122, 243, 0.36)',
        borderColor: '#36495d',
        borderWidth: 3,
      },
      {
        label: 'Hourly Rainfall (inches)',
        type: 'bar',
        data: [],
        backgroundColor: 'rgba(71, 183, 132, .5)',
        borderColor: '#47b784',
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
})

// // Whenever 'day' prop changes, update chart labels + data
watch(
  () => props.day,
  (newDay) => {
    console.log('New day prop:', newDay) //debug

    if (newDay && Array.isArray(newDay.hour)) {
      console.log('Hour array:', newDay.hour) // <-- debug log

      chartData.value.data.labels = newDay.hour.map((h) =>
        new Date(h.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      )
      chartData.value.data.datasets[0].data = newDay.hour.map((h) => h.temp_f)
      chartData.value.data.datasets[1].data = newDay.hour.map((h) => h.precip_in)

      console.log('Labels:', chartData.value.data.labels) // <-- debug log
      console.log('Temps:', chartData.value.data.datasets[0].data) // <-- debug log
      console.log('Rain:', chartData.value.data.datasets[1].data) // <-- debug log

      loaded.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <Chart
      v-if="chartData.data.labels.length"
      :data="chartData.data"
      :options="chartData.options"
    />
  </div>
</template>
