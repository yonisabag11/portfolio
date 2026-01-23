<template>
  <section
    class="absolute rounded-t-lg overflow-hidden select-none"
    :class="isActive ? 'bg-window-blue-active' : 'bg-window-blue-deactivated'"
    :style="windowStyle"
    :id="id"
  >
    <div
      class="absolute top-0 left-0 h-7 w-full z-40 flex justify-between items-center px-1"
      :class="isActive ? 'bg-header-window-active' : 'bg-header-window-deactivated'"
      @mousedown="startDrag"
    >
      <div class="h-5/6 text-white font-semibold flex items-center gap-1 select-none flex-1 overflow-hidden pr-1">
        <img :src="iconSrc" :alt="$t('common.tiny') + ' ' + $t('common.icon') + ' ' + translatedTitle" class="w-4 h-4" />
        <div class="flex items-center overflow-hidden">
          <h4 class="text-header-window text-header-shadow truncate">{{ translatedTitle }}</h4>
        </div>
      </div>
      <div class="h-5/6 mt-px flex items-center gap-px" :class="isActive ? 'opacity-100' : 'opacity-60 '">
        <WindowMinimize @click="toggleMinimize" />
        <WindowMaximize @click="toggleMaximize" :disabled="!resizable" :class="{ 'opacity-60 cursor-default': !resizable, 'cursor-pointer': resizable }" />
        <WindowClose @click="closeWindow" />
      </div>
    </div>
    <div class="absolute w-full h-full overflow-hidden p-0.75">
      <WindowHeaderDropdown :dropdownItems="translatedMenuHeaderItems" :windowsHeaderLogo="windowsHeaderLogo" />
      <div v-if="headerToolsId">
        <WindowHeaderTools :id="id" :headerToolsId="headerToolsId" />
        <WindowHeaderSearch :id="id" :title="translatedTitle" :iconSrc="iconSrc" :isSearchVisible="isSearchVisible" />
      </div>
      <!-- Component containing content for the window goes here it is done in Office.vue component -->
      <slot></slot>
    </div>
    <div v-if="resizable">
      <!-- Resize handlers -->
      <div
        class="absolute bg-transparent top-0 right-0 w-2 h-full cursor-ew-resize"
        @mousedown="startResize"
        data-direction="right"
        :style="{ cursor: maximized ? 'default' : 'ew-resize' }"
      ></div>
      <div
        class="absolute bg-transparent bottom-0 left-0 h-2 w-full cursor-ns-resize"
        @mousedown="startResize"
        data-direction="bottom"
        :style="{ cursor: maximized ? 'default' : 'ns-resize' }"
      ></div>
      <div
        class="absolute bg-transparent bottom-0 right-0 w-2.5 h-2.5 cursor-nwse-resize"
        @mousedown="startResize"
        data-direction="corner"
        :style="{ cursor: maximized ? 'default' : 'nwse-resize' }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, inject, watch, onUnmounted } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import WindowMinimize from '../components/Buttons/WindowMinimize.vue'
import WindowMaximize from '../components/Buttons/WindowMaximize.vue'
import WindowClose from '../components/Buttons/WindowClose.vue'
import WindowHeaderTools from '../components/Windows/WindowHeaderTools.vue'
import WindowHeaderSearch from '../components/Windows/WindowHeaderSearch.vue'
import WindowHeaderDropdown from '../components/Windows/WindowHeaderDropdown.vue'
import menuHeaderData from '@/data/header-menu-data.json'

const emit = defineEmits()

const {
  id,
  title,
  iconSrc,
  initPositionX,
  initPositionY,
  initWidth,
  initHeight,
  minWidth,
  minHeight,
  headerToolsId,
  menuHeaderItemsId,
  resizable,
  windowsHeaderLogo,
  isSearchVisible
} = defineProps({
  id: String,
  title: Object,
  iconSrc: String,
  initPositionX: Number,
  initPositionY: Number,
  initWidth: Number,
  initHeight: Number,
  minWidth: Number,
  minHeight: Number,
  headerToolsId: String,
  menuHeaderItemsId: String,
  resizable: Boolean,
  windowsHeaderLogo: Boolean,
  isSearchVisible: Boolean
})

// Locale management
const localeStore = useLocaleStore()

const translatedTitle = ref(title[localeStore.currentLocale] || title['en'])
const translatedMenuHeaderItems = ref(
  menuHeaderData.menuHeaderItems[menuHeaderItemsId][localeStore.currentLocale] || menuHeaderData.menuHeaderItems[menuHeaderItemsId]['en']
)

watch(
  () => localeStore.currentLocale,
  (newLocale) => {
    translatedTitle.value = title[newLocale] || title['en']
    const items = menuHeaderData.menuHeaderItems[menuHeaderItemsId]
    translatedMenuHeaderItems.value = items ? items[newLocale] || items['en'] : []
  }
)

// Responsive breakpoints
const getBreakpoint = () => {
  const width = window.innerWidth
  if (width < 375) return 'xxs'
  if (width < 640) return 'xs'
  if (width < 768) return 'sm'
  if (width < 1024) return 'md'
  if (width < 1280) return 'lg'
  return 'xl'
}

// App size constants with reactive updates
const appHeight = ref(window.innerHeight - 32)
const appWidth = ref(window.innerWidth)

// Update app dimensions on resize
const updateAppDimensions = () => {
  appHeight.value = window.innerHeight - 32
  appWidth.value = window.innerWidth
}

// Dragging window constants
const isDragging = ref(false)
const initialMouseX = ref(0)
const initialMouseY = ref(0)
const throttleDelay = 16 // Update every 16ms (60 FPS)
let lastUpdateTimestamp = 0

// Window resizing constants
const maximized = ref(false)

// Calculate responsive initial dimensions
const calculateResponsiveSize = () => {
  const breakpoint = getBreakpoint()
  const isMobile = window.innerWidth <= 768
  
  if (isMobile) {
    return {
      width: window.innerWidth,
      height: window.innerHeight - 32
    }
  }
  
  // Scale window size based on viewport for tablets and small screens
  const widthScale = Math.min(1, window.innerWidth / 1280)
  const heightScale = Math.min(1, window.innerHeight / 900)
  const scale = Math.min(widthScale, heightScale)
  
  return {
    width: Math.min(initWidth, window.innerWidth - 40) * scale,
    height: Math.min(initHeight, window.innerHeight - 72) * scale
  }
}

// Window position and size
const windowSize = calculateResponsiveSize()
const windowPosition = ref({ 
  x: Math.max(0, Math.min(initPositionX, window.innerWidth - windowSize.width)), 
  y: Math.max(0, Math.min(initPositionY, window.innerHeight - windowSize.height - 32))
})
const windowWidth = ref(windowSize.width)
const windowHeight = ref(windowSize.height)
const windowTransform = ref(`translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`)

// Window activeness
const activeWindow = inject('activeWindow')
const isActive = computed(() => id === activeWindow.value)

// Window Z-index
const highestZIndex = inject('highestZIndex')

/**
 * Window style added to window component.
 * Responsive on all devices with proper scaling
 */
const windowStyle = computed(() => {
  const isMobile = window.innerWidth <= 768
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768
  
  if (maximized.value || isMobile) {
    return {
      width: '100vw',
      height: 'calc(100dvh - 2rem)',
      top: '0',
      left: '0',
      minWidth: 'auto',
      minHeight: 'auto'
    }
  }
  
  // On tablet and desktop, use calculated dimensions with constraints
  const maxWidth = Math.min(windowWidth.value, appWidth.value - 20)
  const maxHeight = Math.min(windowHeight.value, appHeight.value - 20)
  
  return {
    width: `${maxWidth}px`,
    height: `${maxHeight}px`,
    transform: windowTransform.value,
    minWidth: `${Math.min(minWidth, appWidth.value)}px`,
    minHeight: `${Math.min(minHeight, appHeight.value)}px`,
    maxWidth: `${appWidth.value}px`,
    maxHeight: `${appHeight.value}px`
  }
})

const toggleMaximize = () => {
  maximized.value = !maximized.value
}

const closeWindow = () => {
  emit('close-window')
}

const toggleMinimize = () => {
  emit('toggle-minimize')
}

const startDrag = (event) => {
  isDragging.value = true
  initialMouseX.value = event.clientX
  initialMouseY.value = event.clientY

  // Set the active window to the current window
  activeWindow.value = id

  // Increment the highestZIndex and set the zIndex of the current window to it
  highestZIndex.value++
  windowStyle.value.zIndex = highestZIndex.value

  // Add mouseup event listener to the whole document to stop dragging
  document.addEventListener('mouseup', stopDrag)
  // Add mousemove event listener to the whole document for smoother dragging
  document.addEventListener('mousemove', dragWindow)
}

const stopDrag = () => {
  isDragging.value = false

  // Remove mouseup and mousemove event listeners when dragging stops
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', dragWindow)
}

const dragWindow = (event) => {
  if (isDragging.value && !resizing.value) {
    const currentTime = performance.now()
    if (currentTime - lastUpdateTimestamp > throttleDelay) {
      const deltaX = event.clientX - initialMouseX.value
      const deltaY = event.clientY - initialMouseY.value

      // Calculate the new window position
      const newX = windowPosition.value.x + deltaX
      const newY = windowPosition.value.y + deltaY

      // Define the boundaries
      const minX = 0 // Minimum X position
      const minY = 0 // Minimum Y position
      const maxX = window.innerWidth - windowSize.width / 10 // Maximum X position
      const maxY = window.innerHeight - windowSize.height / 10 // Maximum Y position

      // Ensure the window stays within the boundaries
      windowPosition.value.x = Math.min(Math.max(newX, minX), maxX)
      windowPosition.value.y = Math.min(Math.max(newY, minY), maxY)

      // Update the transform property
      windowTransform.value = `translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`

      initialMouseX.value = event.clientX
      initialMouseY.value = event.clientY
      lastUpdateTimestamp = currentTime
    }
  }
}

const resizing = ref(false)
const initialWindowSize = ref({ width: 0, height: 0 })
const resizeDirection = ref('')

const startResize = (event) => {
  resizing.value = true
  initialMouseX.value = event.clientX
  initialMouseY.value = event.clientY
  resizeDirection.value = event.target.dataset.direction

  // Set the initial window size based on the current size
  initialWindowSize.value = { width: windowWidth.value, height: windowHeight.value }

  document.addEventListener('mouseup', stopResize)
  document.addEventListener('mousemove', resizeWindow)
}

const stopResize = () => {
  resizing.value = false

  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('mousemove', resizeWindow)

  // Enable user selection
  document.body.style.userSelect = ''
}

const resizeWindow = (event) => {
  if (resizing.value) {
    const deltaX = event.clientX - initialMouseX.value
    const deltaY = event.clientY - initialMouseY.value

    if (resizeDirection.value === 'right') {
      let newWidth = initialWindowSize.value.width + deltaX
      newWidth = Math.min(newWidth, appWidth.value)
      windowWidth.value = newWidth < minWidth ? minWidth : newWidth
    } else if (resizeDirection.value === 'bottom') {
      let newHeight = initialWindowSize.value.height + deltaY
      newHeight = Math.min(newHeight, appHeight.value)
      windowHeight.value = newHeight < minHeight ? minHeight : newHeight
    } else if (resizeDirection.value === 'corner') {
      let newWidth = initialWindowSize.value.width + deltaX
      let newHeight = initialWindowSize.value.height + deltaY
      newWidth = Math.min(newWidth, appWidth.value)
      newHeight = Math.min(newHeight, appHeight.value)
      windowWidth.value = newWidth < minWidth ? minWidth : newWidth
      windowHeight.value = newHeight < minHeight ? minHeight : newHeight
    }

    // Update the transform property
    windowTransform.value = `translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`
  }
}

// Handle window resize events
const handleWindowResize = () => {
  updateAppDimensions()
  
  const isMobile = window.innerWidth <= 768
  
  if (isMobile && !maximized.value) {
    // Auto-maximize on mobile for better UX
    maximized.value = true
  }
  
  // Ensure window stays within viewport bounds
  if (!maximized.value) {
    const responsiveSize = calculateResponsiveSize()
    windowWidth.value = Math.min(windowWidth.value, responsiveSize.width)
    windowHeight.value = Math.min(windowHeight.value, responsiveSize.height)
    
    // Adjust position if window is now outside viewport
    windowPosition.value.x = Math.max(0, Math.min(windowPosition.value.x, appWidth.value - windowWidth.value))
    windowPosition.value.y = Math.max(0, Math.min(windowPosition.value.y, appHeight.value - windowHeight.value))
    windowTransform.value = `translate(${windowPosition.value.x}px, ${windowPosition.value.y}px)`
  }
}

// Add resize listener
if (typeof window !== 'undefined') {
  window.addEventListener('resize', handleWindowResize)
}

// Cleanup on unmount
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleWindowResize)
  }
  // Clean up drag and resize listeners if still active
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', dragWindow)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('mousemove', resizeWindow)
})
</script>

<style scoped>
.text-header-shadow {
  text-shadow: 1px 1px 0px #09177f;
}
</style>
