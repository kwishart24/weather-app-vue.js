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
    <aside v-if="showSidebar" class="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Favorites</h2>
        <button @click="emit('close')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <ul>
        <li
          v-for="fav in favorites"
          :key="fav.location.name"
          class="py-2 border-b flex justify-between items-center"
        >
          <!-- Clicking the name selects -->
          <span class="cursor-pointer hover:text-blue-600" @click="emit('select-favorite', fav)">
            {{ fav.location.name }}
          </span>

          <!-- Delete button -->
          <button @click="confirmDelete(fav.location.name)" class="text-red-500 hover:text-red-700">
            <i class="fa-solid fa-trash"></i>
          </button>
        </li>
      </ul>
    </aside>
  </transition>
</template>
