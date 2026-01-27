<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  age: Number
})

const { t } = useI18n()
const localeStore = useLocaleStore()
const displayName = computed(() => {
  return localeStore.currentLocale === 'he' ? 'יוני סבג' : 'Yoni Sabag'
})

const displayAge = computed(() => {
  // For Hebrew RTL, put the word before the number
  if (localeStore.currentLocale === 'he') {
    return t('common.years') + ' ' + props.age
  }
  // For English LTR, put the number before the word
  return props.age + ' ' + t('common.years')
})
</script>

<template>
  <div class="flex items-center gap-2" :class="{ 'flex-row-reverse': localeStore.currentLocale === 'he' }">
    <img src="/img/icons/cv/yoni-sabag-photo-cv.webp" :alt="$t('alt.cvPhoto')" class="w-20 h-20" />
    <div class="flex justify-center flex-col">
      <h1 class="font-trebuchet-pixel">{{ displayName }}</h1>
      <h2 class="font-trebuchet-pixel">{{ displayAge }}</h2>
    </div>
    <div class="flex items-center ml-10">
      <h2 class="font-trebuchet-pixel py-1">{{ $t('common.gamedev') }}, {{ $t('common.webdev') }}, {{ $t('common.softwaredev') }}</h2>
    </div>
  </div>
</template>
