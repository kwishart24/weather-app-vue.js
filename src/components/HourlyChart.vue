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
  LineController,
  BarController,
} from 'chart.js'
import { Chart } from 'vue-chartjs'
import { ref } from 'vue'
import { watch } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineController,
  BarController,
)

const props = defineProps({
  day: Object,
  labelColor: {
    type: String,
    default: '#ffffff',
  },
  lineColors: {
    type: Object,
    default: () => ({ background: '#64748b', border: '#64748b' }),
  },
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
        backgroundColor: props.lineColors.background,
        borderColor: props.lineColors.border,
        borderWidth: 3,
      },
      {
        label: 'Hourly Rainfall (inches)',
        type: 'bar',
        data: [],
        //backgroundColor: 'rgba(71, 183, 132, .5)',
        backgroundColor: 'rgba(254, 0, 172, 1)',
        borderColor: '#fe00ac',
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: props.labelColor, // 👈 legend font color for dataset labels
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: props.labelColor,
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        ticks: {
          color: props.labelColor,
          font: {
            weight: 'bold',
          },
        },
      },
    },
  },
})

// // Whenever 'day' prop changes, update chart labels + data
watch(
  () => props.day,
  (newDay) => {
    console.log('New day prop:', newDay) //debug

    if (newDay && Array.isArray(newDay.hour)) {
      chartData.value.data.labels = newDay.hour.map((h) =>
        new Date(h.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      )
      chartData.value.data.datasets[0].data = newDay.hour.map((h) => h.temp_f)
      chartData.value.data.datasets[1].data = newDay.hour.map((h) => h.precip_in)

      loaded.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <figure
    role="group"
    aria-labelledby="hourly-chart-title"
    aria-describedby="hourly-chart-desc"
    class="relative"
    tabindex="0"
  >
    <!-- Accessible title -->
    <h3 id="hourly-chart-title" class="sr-only">Hourly Weather Chart</h3>

    <!-- Chart itself -->
    <Chart
      v-if="chartData.data.labels.length"
      :data="chartData.data"
      :options="chartData.options"
      role="img"
      aria-label="Line chart of hourly temperature and bar chart of hourly rainfall"
    />

    <!-- Accessible description -->
    <figcaption id="hourly-chart-desc" class="sr-only">
      This chart shows hourly temperature in degrees Fahrenheit as a line, and hourly rainfall in
      inches as bars.
    </figcaption>
  </figure>

  <!-- Screen reader only table -->
  <table class="sr-only" aria-labelledby="hourly-chart-title">
    <caption>
      Hourly forecast data table
    </caption>
    <thead>
      <tr>
        <th scope="col">Hour</th>
        <th scope="col">Temperature (°F)</th>
        <th scope="col">Rainfall (inches)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(hour, i) in props.day.hour" :key="i">
        <td>
          {{ new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }) }}
        </td>
        <td>{{ Math.round(hour.temp_f) }}</td>
        <td>{{ hour.precip_in }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
:focus-within {
  outline: 2px solid #2563eb;
  outline-offset: 4px;
}
</style>
