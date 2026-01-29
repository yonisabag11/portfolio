<template>
  <div class="absolute bottom-0 w-full bg-player shadow-inner">
    <!-- Progress Bar -->
    <div class="w-full px-2 pt-1">
      <input 
        type="range" 
        :min="0" 
        :max="currentTrack.duration_ms" 
        :value="currentTime" 
        @input="seekTo" 
        class="progress-slider w-full cursor-pointer"
        :style="`--progress: ${(currentTime / currentTrack.duration_ms) * 100}%`"
      />
    </div>
    
    <!-- Controls -->
    <div class="flex items-center justify-between h-14 px-2" :class="localeStore.currentLocale === 'he' ? 'flex-row-reverse' : ''">
      <div class="w-1/3">
        <div class="flex items-center gap-2" :class="localeStore.currentLocale === 'he' ? 'flex-row-reverse' : ''">
          <img v-if="currentTrack.album && currentTrack.album.images" :src="currentTrack.album.images[0].url" :alt="$t('alt.albumCover')" class="w-10 h-10 rounded-sm" />
          <div class="flex flex-col w-full" :class="localeStore.currentLocale === 'he' ? 'ml-5' : 'mr-5'">
            <p class="text-xs font-trebuchet-pixel truncate">{{ currentTrack.name }}</p>
            <p class="text-xs font-trebuchet-pixel truncate">
              {{ currentTrack.artists ? currentTrack.artists[0].name : '' }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-1/3 flex items-center justify-center">
        <button @click="previousTrack" class="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 cursor-pointer">
          <img src="/img/icons/music/previous-icon.webp" :alt="$t('alt.previousMusic')" class="w-full h-full" />
        </button>
        <button
          @click="togglePlay"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 relative overflow-hidden play-button cursor-pointer"
          :class="{ 'is-playing': isPlaying }"
        ></button>
        <button @click="nextTrack" class="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 cursor-pointer">
          <img src="/img/icons/music/next-icon.webp" :alt="$t('alt.nextMusic')" class="w-full h-full" />
        </button>
      </div>
      <div class="w-1/3">
        <p class="text-xs font-trebuchet-pixel text-center">{{ formatTime(currentTime) }} / {{ formatTime(currentTrack.duration_ms) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { useVolumeStore } from '@/stores/volumeStore'
import { useLocaleStore } from '@/stores/localeStore'

const props = defineProps({
  playlist: {
    type: Array,
    required: true
  },
  trackToggled: String
})

const volumeStore = useVolumeStore()
const localeStore = useLocaleStore()
const currentTrack = ref(props.playlist[0])
const isPlaying = ref(false)
const currentTime = ref(0)
const trackTime = ref(0)
let audioElement = null

const updateCurrentTime = () => {
  if (audioElement) {
    currentTime.value = audioElement.currentTime * 1000 // Convert to milliseconds
  }
  if (currentTime.value >= currentTrack.value.duration_ms) {
    nextTrack()
  }
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  const audioFile = '/musics/' + currentTrack.value.id + '.mp3'
  if (isPlaying.value) {
    volumeStore.playAudio(audioFile)
    audioElement = volumeStore.audioElements[audioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  } else {
    volumeStore.pauseAudio(audioFile)
    if (audioElement) {
      audioElement.removeEventListener('timeupdate', updateCurrentTime)
    }
  }
}

const previousTrack = () => {
  const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack.value.id)
  const currentAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0

  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }

  if (currentIndex === 0) {
    currentTrack.value = props.playlist[props.playlist.length - 1]
  } else {
    currentTrack.value = props.playlist[currentIndex - 1]
  }

  const newAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
  if (isPlaying.value) {
    volumeStore.playAudio(newAudioFile)
    audioElement = volumeStore.audioElements[newAudioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  }
}

const nextTrack = () => {
  const currentIndex = props.playlist.findIndex((track) => track.id === currentTrack.value.id)
  const currentAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0

  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }

  if (currentIndex === props.playlist.length - 1) {
    currentTrack.value = props.playlist[0]
  } else {
    currentTrack.value = props.playlist[currentIndex + 1]
  }

  const newAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
  if (isPlaying.value) {
    volumeStore.playAudio(newAudioFile)
    audioElement = volumeStore.audioElements[newAudioFile]
    audioElement.addEventListener('timeupdate', updateCurrentTime)
  }
}

const seekTo = (event) => {
  const newTime = parseFloat(event.target.value)
  currentTime.value = newTime
  
  if (audioElement) {
    audioElement.currentTime = newTime / 1000 // Convert milliseconds to seconds
  }
}

function formatTime(ms) {
  if (ms == null || isNaN(ms) || ms == undefined) {
    return '0:00'
  }
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// watch the  trackToggled prop to play the track if it's different from the current track
watch(
  () => props.trackToggled,
  (newTrack) => {
    if (newTrack !== currentTrack.value.id) {
      const currentAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
      volumeStore.pauseAudio(currentAudioFile)
      volumeStore.resetAudio(currentAudioFile)
      currentTime.value = 0

      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateCurrentTime)
      }

      currentTrack.value = props.playlist.find((track) => track.id === newTrack)
      const newAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
      if (isPlaying.value) {
        volumeStore.playAudio(newAudioFile)
        audioElement = volumeStore.audioElements[newAudioFile]
        audioElement.addEventListener('timeupdate', updateCurrentTime)
      }
    }
  }
)

onUnmounted(() => {
  if (audioElement) {
    audioElement.removeEventListener('timeupdate', updateCurrentTime)
  }
  // Reset component state if window is closed
  const currentAudioFile = '/musics/' + currentTrack.value.id + '.mp3'
  volumeStore.pauseAudio(currentAudioFile)
  volumeStore.resetAudio(currentAudioFile)
  currentTime.value = 0
})
</script>

<style scoped>
.play-button {
  background-image: url('/img/icons/music/play-icon.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

/* Progress Slider */
.progress-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: linear-gradient(to right, #1db954 var(--progress), #ddd var(--progress));
  border-radius: 3px;
  outline: none;
}

.progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #1db954;
  cursor: pointer;
  transition: all 0.15s ease;
}

.progress-slider::-webkit-slider-thumb:hover {
  background: #1ed760;
  transform: scale(1.2);
}

.progress-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #1db954;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.progress-slider::-moz-range-thumb:hover {
  background: #1ed760;
  transform: scale(1.2);
}
}

.play-button:hover {
  background-image: url('/img/icons/music/play-icon-hover.webp');
}

.play-button.is-playing {
  background-image: url('/img/icons/music/pause-icon.webp');
}
</style>
