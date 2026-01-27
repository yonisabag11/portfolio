<script setup>
import { useConnectionStore } from '@/stores/connectionStore'
import { useLocaleStore } from '@/stores/localeStore'

const connectionStore = useConnectionStore()
const localeStore = useLocaleStore()

const handleDisconnect = () => {
  connectionStore.disconnect()
}
</script>

<template>
  <router-link to="/" @click="handleDisconnect">
    <button class="flex text-white text-xs h-full items-center buttons-header-bottom px-1 full-screen" :class="[{ 'flex-row-reverse': localeStore.currentLocale === 'he' }, localeStore.currentLocale === 'he' ? 'gap-2 sm:gap-3' : 'gap-0.5 sm:gap-1']">
      <img src="/img/icons/key-log-icon.webp" :alt="$t('header.disconnect')" class="w-6 h-6 sm:w-7 sm:h-7" />
      <p class="small-p">{{ $t('header.disconnect') }}</p>
    </button>
  </router-link>
</template>
