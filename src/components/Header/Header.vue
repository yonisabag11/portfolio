<template>
  <header class="header-component select-none">
    <div class="absolute left-0 sm:left-2 header-radius overflow-hidden bottom-0 mb-8 modal-size z-max bg-color-blue-window touch-manipulation">
      <div class="w-full h-full relative overflow-hidden">
        <div class="h-12 sm:h-16 flex items-center px-2 header-top-background">
          <ProfilePicture class="w-8 h-8 sm:w-11 sm:h-11 stroke-white-1 header-profile-shadow" />
          <h2 class="text-sm sm:text-lg ml-2 text-white text-shadow-header truncate">{{ displayName }}</h2>
        </div>
        <section class="relative w-full h-full px-0.5">
          <hr class="absolute top-0 left-0 right-0 bg-orange-hr block" />
          <div class="w-full h-full flex flex-col sm:flex-row">
            <div class="w-full sm:w-7/12 h-1/2 sm:h-full bg-white px-1 py-1 overflow-y-auto">
              <div v-for="entity in localEntities" :key="entity.id">
                <div v-if="entity.headerPosition === 'left'" class="flex flex-col gap-2 sm:gap-3 py-1 sm:py-2">
                  <HeaderLeftButton @toggle-button="toggleWindow" :buttonName="entity.id">
                    <template #img>
                      <img :src="getAssetPath(entity.imgSrc)" :alt="$t('common.icon') + ' ' + getLocalizedTitle(entity)" class="w-6 h-6 sm:w-8 sm:h-8" />
                    </template>
                    <template #title>
                      {{ getLocalizedTitle(entity) }}
                    </template>
                    <template #subtitle>
                      {{ getLocalizedSubtitle(entity) }}
                    </template>
                  </HeaderLeftButton>
                </div>
              </div>
            </div>
            <div class="w-full sm:w-1/2 h-1/2 sm:h-full bg-color-blue-header-left left-blue-header-1 px-1 overflow-y-auto">
              <div class="py-1 sm:py-2">
                <div v-for="entity in localEntities" :key="entity.id">
                  <div v-if="entity.headerPosition === 'right'">
                    <HeaderRightButton @toggle-button="toggleWindow" :buttonName="entity.id" class="cursor-pointer min-h-[44px]">
                      <template #img>
                        <img :src="getAssetPath(entity.iconSrc)" :alt="getLocalizedTitle(entity)" class="w-6 h-6 sm:w-8 sm:h-8" />
                      </template>
                      <template #text> {{ getLocalizedTitle(entity) }}</template>
                    </HeaderRightButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="absolute bottom-0 h-10 sm:h-12 w-full">
          <div class="header-bot-background h-full flex justify-end items-center">
            <div class="flex h-5/6 gap-2 sm:gap-3 mr-2">
              <HeaderDisconnect @click="turnOffHeader" class="cursor-pointer touch-target" />
              <HeaderShutdown @click="shutdown" class="cursor-pointer touch-target" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore.js'
import { useLocaleStore } from '@/stores/localeStore'
import { getAssetPath } from '@/utils/assetPath'

import ProfilePicture from '@/components/ProfilePicture.vue'
import HeaderLeftButton from '@/components/Buttons/HeaderLeftButton.vue'
import HeaderRightButton from '@/components/Buttons/HeaderRightButton.vue'
import HeaderShutdown from '@/components/Buttons/HeaderShutdown.vue'
import HeaderDisconnect from '@/components/Buttons/HeaderDisconnect.vue'

const emit = defineEmits()
const volumeStore = useVolumeStore()
const localeStore = useLocaleStore()

const props = defineProps({
  entities: {
    type: Array,
    required: true
  }
})

const localEntities = ref([...props.entities])

watchEffect(() => {
  localEntities.value = [...props.entities]
})

const displayName = computed(() => {
  return localeStore.currentLocale === 'he' ? 'יוני סבג' : 'Yoni Sabag'
})

const turnOffHeader = () => {
  emit('toggle-header')
}

const toggleWindow = (buttonName) => {
  // Close the header and open the window
  turnOffHeader()
  emit('toggle-' + buttonName)
}

const shutdown = () => {
  volumeStore.playAudio(getAssetPath('/sounds/shutdown-windows.mp3'))
  volumeStore.unmuteAudio()
}

const getLocalizedTitle = (entity) => {
  return entity.title[localeStore.currentLocale] || entity.title['en']
}

const getLocalizedSubtitle = (entity) => {
  return entity.subtitle[localeStore.currentLocale] || entity.subtitle['en']
}
</script>

<style scoped>
.header-radius {
  border-radius: 5px 5px 0px 0px;
}

.modal-size {
  width: min(430px, 95vw);
  height: min(530px, 85vh);
  max-width: 430px;
  max-height: 85vh;
}

.touch-manipulation {
  touch-action: manipulation;
}

/* Extra small devices (phones, less than 375px) */
@media (max-width: 374px) {
  .modal-size {
    width: 100vw;
    height: 70vh;
    left: 0 !important;
    bottom: 2rem !important;
    border-radius: 0;
  }
}

/* Small devices (phones, 375px to 640px) */
@media (min-width: 375px) and (max-width: 640px) {
  .modal-size {
    width: min(340px, 95vw);
    height: min(480px, 80vh);
  }
}

/* Medium devices (tablets, 641px to 768px) */
@media (min-width: 641px) and (max-width: 768px) {
  .modal-size {
    width: min(400px, 90vw);
    height: min(500px, 85vh);
  }
}

/* Landscape mode on phones */
@media (max-height: 500px) and (orientation: landscape) {
  .modal-size {
    width: min(350px, 45vw);
    height: 90vh;
  }
}
</style>
