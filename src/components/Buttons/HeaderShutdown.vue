<script setup>
import { getAssetPath } from '@/utils/assetPath'
import { useConnectionStore } from '@/stores/connectionStore'
import { useLocaleStore } from '@/stores/localeStore'

const connectionStore = useConnectionStore()
const localeStore = useLocaleStore()

const handleRestart = () => {
  connectionStore.restart()
}
</script>

<template>
  <router-link to="/" @click="handleRestart">
    <button class="flex text-white text-xs h-full items-center buttons-header-bottom px-1 full-screen" :class="[{ 'flex-row-reverse': localeStore.currentLocale === 'he' }, localeStore.currentLocale === 'he' ? 'gap-2 sm:gap-3' : 'gap-0.5 sm:gap-1']">
      <img :src="getAssetPath('/img/icons/shutdown-icon.webp')" :alt="$t('header.shutdown')" class="w-6 h-6 sm:w-7 sm:h-7" />
      <p class="small-p">{{ $t('header.shutdown') }}</p>
    </button>
  </router-link>
</template>
