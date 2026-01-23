<template>
  <footer>
    <div class="absolute bottom-0 footer-gradient shadow-footer w-full z-max">
      <div class="h-8 flex items-center touch-manipulation">
        <div class="flex items-center h-full overflow-hidden flex-1 min-w-0">
          <StartButton @click="toggleHeader" class="flex-shrink-0" />
          <div class="flex flex-1 h-full ml-px sm:ml-2 gap-0.5 overflow-x-auto overflow-y-hidden scrollbar-hide">
            <PelletApp 
              v-for="entity in entities" 
              :key="entity.id" 
              :entity="entity" 
              @toggle-window="toggleWindow" 
              class="flex-shrink-0" 
            />
          </div>
        </div>
        <FooterRight class="flex-shrink-0" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import StartButton from '../Buttons/StartButton.vue'
import FooterRight from './FooterRight.vue'
import PelletApp from './PelletApp.vue'

const emit = defineEmits(['toggle-header', 'toggle-window'])

const toggleHeader = () => {
  emit('toggle-header')
}

const toggleWindow = (windowId) => {
  emit('toggle-window', windowId)
}

const props = defineProps({
  entities: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* Hide scrollbar but allow scrolling on mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Better touch interaction */
.touch-manipulation {
  touch-action: manipulation;
}
</style>
