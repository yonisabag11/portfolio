<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'

const props = defineProps({
  age: Number
})

const localeStore = useLocaleStore()
const displayName = computed(() => {
  return localeStore.currentLocale === 'he' ? 'יוני סבג' : 'Yoni Sabag'
})
</script>

<template>
  <div class="grid grid-flow-col auto-cols-max gap-2">
    <img src="/img/icons/cv/yoni-sabag-photo-cv.webp" :alt="$t('alt.cvPhoto')" class="w-20 h-20" />
    <div class="flex justify-center flex-col">
      <h1 class="font-trebuchet-pixel">{{ displayName }}</h1>
      <h2 class="font-trebuchet-pixel">{{ props.age + ' ' + $t('common.years') }}</h2>
    </div>
    <div class="flex items-center ml-10">
      <h2 class="font-trebuchet-pixel py-1">{{ $t('common.gamedev') }}, {{ $t('common.webdev') }}, {{ $t('common.softwaredev') }}</h2>
    </div>
  </div>
</template>
