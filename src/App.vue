<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import WeatherCard from './components/WeatherCard.vue'
// import HourlyChart from './components/HourlyChart.vue'
// import ForecastTable from './components/ForecastTable.vue'
import FavoritesList from './components/FavoritesList.vue'

const places = ref([])
const favorites = ref([])
const showSidebar = ref(false)

const addPlace = (data) => {
  places.value.unshift(data)
}

const deletePlace = (name) => {
  if (confirm('Are you sure?')) {
    places.value = places.value.filter((p) => p.location.name !== name)
  }
}

//Save location to favorites
const saveFavorite = (place) => {
  if (!favorites.value.find((f) => f.location.name === place.location.name)) {
    favorites.value.push(place)
    alert(`${place.location.name} has been saved to favorites!`)
  }
}

// 👉 When user clicks a favorite in the sidebar
const selectFavorite = (fav) => {
  // Remove any existing card for this location
  places.value = places.value.filter((p) => p.location.name !== fav.location.name)
  // Add it back to the top
  places.value.unshift(fav)
  // Close sidebar
  showSidebar.value = false
}

const deleteFavorite = (name) => {
  favorites.value = favorites.value.filter((f) => f.location.name !== name)
}
</script>

<template>
  <main aria-labelledby="app-title">
    <!-- Screen reader title -->
    <h1 id="app-title" class="sr-only">Weather App</h1>
    <!-- Favorites Button -->
    <div class="flex justify-end p-2">
      <button
        @click="showSidebar = true"
        aria-label="Open favorites list"
        class="p-4 font-bold rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <i class="fa-solid fa-bookmark" aria-hidden="true"></i>Favorites
      </button>
    </div>

    <!-- Date -->
    <div class="text-center mb-6">
      <h2 aria-label="Current date">
        {{
          new Date().toLocaleString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }}
      </h2>
    </div>

    <!-- Search -->
    <div>
      <SearchInput @place-data="addPlace" />
    </div>

    <!-- Weather Cards -->
    <div class="grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(place, idx) in places" :key="idx">
        <section aria-labelledby="cards-heading">
          <!-- For Screen readers only -->
          <h2 id="cards-heading" class="sr-only">Weather cards</h2>
          <WeatherCard :place="place" @delete-place="deletePlace" @save-favorite="saveFavorite" />
        </section>
      </div>
    </div>

    <!-- Favorites List -->
    <aside
      v-if="showSidebar"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-heading"
      aria-describedby="favorites-desc"
    >
      <!-- Screen Reader Header -->
      <h2 id="favorites-heading" class="sr-only">Favorites list</h2>
      <p id="favorites-desc" class="sr-only">
        Select a favorite location to view its weather card or delete it from the list.
      </p>

      <FavoritesList
        v-if="showSidebar"
        :favorites="favorites"
        :showSidebar="showSidebar"
        @close="showSidebar = false"
        @select-favorite="selectFavorite"
        @delete-favorite="deleteFavorite"
      />
    </aside>
  </main>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>
