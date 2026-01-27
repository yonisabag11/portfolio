<script setup>
import { computed } from 'vue'
import { useConnectionStore } from '@/stores/connectionStore'
import { useLocaleStore } from '@/stores/localeStore'
import ProfilePicture from '@/components/ProfilePicture.vue'

const connectionStore = useConnectionStore()
const localeStore = useLocaleStore()

const displayName = computed(() => {
  return localeStore.currentLocale === 'he' ? 'יוני' : 'Yoni'
})

const handleLogin = () => {
  connectionStore.login()
}
</script>

<template>
  <div class="flex items-center md:w-1/2 w-full md:static md:justify-start justify-center">
    <div @click="handleLogin" class="h-28 md:w-7/12 w-11/12">
      <router-link to="/office" class="h-full w-full rounded-xl bg-color-login-blue flex items-center py-2.5 px-6 stroke-white-1 cursor-pointer">
        <div class="w-full flex items-center text-white gap-4 relative outline-none">
          <div>
            <ProfilePicture class="w-16 h-16 stroke-yellow-2" />
          </div>
          <div>
            <h2 class="text-xl md:text-2xl">{{ displayName }}</h2>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
