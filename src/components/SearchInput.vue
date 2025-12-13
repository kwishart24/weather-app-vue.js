<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['place-data'])

const searchTerm = reactive({
  query: '',
  timeout: null,
  results: null,
  error: null,
  fallback: false,
  loading: false,
})

const handleSearch = () => {
  clearTimeout(searchTerm.timeout)
  searchTerm.timeout = setTimeout(async () => {
    if (searchTerm.query !== '') {
      searchTerm.loading = true
      try {
        const res =
          await fetch(`https://api.weatherapi.com/v1/search.json?key=a675400710724a4ea77230557250312&q=${searchTerm.query}
        `)

        if (!res.ok) {
          throw new Error(`Search failed: ${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        searchTerm.results = data
        searchTerm.error = null
      } catch (err) {
        console.error(err)
        searchTerm.results = null
        searchTerm.error = 'Unable to fetch search results. Please try again.'
      } finally {
        searchTerm.loading = false
      }
    } else {
      searchTerm.results = null
      searchTerm.error = null
    }
  }, 500)
}

const getWeather = async (id) => {
  searchTerm.loading = true
  try {
    //First attempt: 5-day forecast
    const res =
      await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a675400710724a4ea77230557250312&q=id:${id}&days=5&aqi=no&alerts=no
`)

    if (!res.ok) {
      throw new Error(`Forecast failed: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    emit('place-data', data)

    searchTerm.query = ''
    searchTerm.results = null
    searchTerm.error = null
    searchTerm.fallback = false
  } catch (err) {
    console.error('5-day forecast failed:', err)

    //Fallback: try 3-day forecast
    try {
      const res3 = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=a675400710724a4ea77230557250312&q=id:${id}&days=3&aqi=no&alerts=no`,
      )

      if (!res3.ok) {
        throw new Error(`3-day forecast failed: ${res3.status} ${res3.statusText}`)
      }

      const data3 = await res3.json()
      emit('place-data', data3)

      searchTerm.query = ''
      searchTerm.results = null
      searchTerm.error = null
      searchTerm.fallback = true
    } catch (err3) {
      console.error('3-day forecast also failed:', err3)
      searchTerm.error = 'Unable to fetch forecast data. Please try again later.'
      searchTerm.fallback = false
    }
  } finally {
    searchTerm.loading = false
  }
}
</script>

<template>
  <div>
    <!-- search field -->
    <form>
      <div class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center">
        <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600 mr-3"></i>
        <input
          type="text"
          placeholder="Search for a place"
          class="rounded-r-lg p-2 border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
          v-model="searchTerm.query"
          @input="handleSearch"
        />
      </div>
    </form>

    <!-- loading spinner -->
    <div v-if="searchTerm.loading" class="flex items-center mt-2 text-indigo-600">
      <svg
        class="animate-spin h-5 w-5 mr-2 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span>Fetching forecast data...</span>
    </div>

    <!-- error message -->
    <div v-if="searchTerm.error" class="text-red-600 mt-2">
      {{ searchTerm.error }}
    </div>

    <!-- fallback banner -->
    <div
      v-if="searchTerm.fallback"
      class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mt-2"
    >
      Showing 3‑day forecast (5‑day unavailable).
    </div>

    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div v-if="searchTerm.results !== null">
        <div v-for="place in searchTerm.results" :key="place.id">
          <button
            @click="getWeather(place.id)"
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ place.name }}, {{ place.region }}, {{ place.country }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
