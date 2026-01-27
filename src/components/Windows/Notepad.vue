<template>
  <div class="relative right-0 h-full flex">
    <textarea
      v-model="noteContent"
      class="w-full h-content-headless-toolbox bg-white overflow-y-scroll outline-none resize-none px-1 font-trebuchet-pixel text-md"
      :class="{ 'text-right': localeStore.currentLocale === 'he' }"
      :dir="localeStore.currentLocale === 'he' ? 'rtl' : 'ltr'"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const localeStore = useLocaleStore()
const noteContent = ref('')
</script>
