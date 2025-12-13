<script setup>
defineProps({
  favorites: Array,
  showSidebar: Boolean,
})

const emit = defineEmits(['close', 'select-favorite', 'delete-favorite'])

// helper method for delete with confirmation
const confirmDelete = (name) => {
  if (confirm(`Delete ${name} from favorites?`)) {
    emit('delete-favorite', name)
  }
}
</script>

<template>
  <transition name="slide">
    <aside
      v-if="showSidebar"
      class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50"
      role="complementary"
      aria-label="Favorites sidebar"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Favorites</h2>
        <button @click="emit('close')" aria-label="Close favorites sidebar">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <ul aria-label="Favorite locations">
        <li
          v-for="fav in favorites"
          :key="fav.location.name"
          class="py-2 border-b flex justify-between items-center"
        >
          <!-- Clicking the name selects -->
          <span
            class="cursor-pointer hover:text-blue-600"
            @click="emit('select-favorite', fav)"
            aria-label="Select {{ fav.location.name }} from favorites"
          >
            {{ fav.location.name }}
          </span>

          <!-- Delete button -->
          <button
            @click="confirmDelete(fav.location.name)"
            class="text-red-500 hover:text-red-700"
            aria-label="Delete {{ fav.location.name }} from favorites"
          >
            <i class="fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </aside>
  </transition>
</template>
