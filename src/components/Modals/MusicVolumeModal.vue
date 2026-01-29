<script setup>
import { ref, computed } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const isRtl = computed(() => locale.value && locale.value.toString().startsWith('he'))

const volumeStore = useVolumeStore()

// Make volume a ref so it's reactive
const volume = ref(volumeStore.volume)

// Define the adjustVolume method
const adjustVolume = () => {
  volumeStore.setVolume(volume.value)
}

const labelParts = computed(() => {
  const text = (t('footer.volumeControl') || '') + ''
  if (!text) return ['', '']
  const parts = text.split(/\s+/)
  if (parts.length === 1) return [parts[0], '']
  if (parts.length === 2) return [parts[0], parts[1]]
  const splitIndex = Math.ceil(parts.length / 2)
  return [parts.slice(0, splitIndex).join(' '), parts.slice(splitIndex).join(' ')]
})
</script>

<template>
  <section class="absolute bottom-10 right-5 md:right-9 w-24 rounded-t-md overflow-hidden bg-window-blue-deactivated p-0.5">
    <div class="absolute top-0 left-0 h-7 w-full z-10 flex items-center px-1.5 bg-header-window-active">
      <img src="/img/icons/volume-icon-sm.webp" :alt="$t('common.icon') + ' volume'" class="w-4 h-4 mr-1" />
      <h4 class="text-header-window text-header-shadow truncate">{{ $t('modale.control') }}</h4>
    </div>
    <div class="bg-light-yellow h-52 mt-3 pr-1">
      <div class="h-full w-full flex items-center px-2">
        <label class="text-black text-xs font-trebuchet-pixel w-10 text-left pr-1 whitespace-normal" :dir="isRtl ? 'rtl' : 'ltr'" for="volume">
          <div class="leading-tight">{{ labelParts[0] }}</div>
          <div class="leading-tight">{{ labelParts[1] }}</div>
        </label>
        <div class="flex-1 flex justify-end pr-3">
          <input class="slider cursor-pointer" type="range" min="0" max="1" step="0.01" v-model.number="volume" @input="adjustVolume" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slider {
  writing-mode: vertical-lr;
  direction: rtl;
  width: 4px;
  height: 150px;
  padding: 0;
  margin: 0;
  box-shadow:
    1px 0 0 #fff,
    1px 1px 0 #fff,
    0 1px 0 #fff,
    -1px 0 0 #a9a9a9,
    -1px -1px 0 #a9a9a9,
    0 -1px 0 #a9a9a9,
    -1px 1px 0 #fff,
    1px -1px #a9a9a9;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: url('/img/cursors/volume-icon.webp') center/contain no-repeat;
  outline: none;
  padding: 0;
  height: 9px;
  width: 20px;
}

.slider::-moz-range-thumb {
  background: url('/img/cursors/volume-icon.webp') center/contain no-repeat;
  outline: none;
  padding: 0;
  border-radius: 0;
  border: none;
  height: 9px;
  width: 20px;
}

.text-header-shadow {
  text-shadow: 1px 1px 0px #09177f;
}
</style>
