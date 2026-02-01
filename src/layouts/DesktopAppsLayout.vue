<script setup>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import { useDesktopIconsStore } from '@/stores/desktopIconsStore'
import { getAssetPath } from '@/utils/assetPath'

const emit = defineEmits()

const props = defineProps({
  entities: {
    type: Array,
    required: true
  }
})

const localEntities = ref([])
const iconPositions = ref({})
const draggingIcon = ref(null)
const dragStartX = ref(0)
const dragStartY = ref(0)
const dragStartPosX = ref(0)
const dragStartPosY = ref(0)
const dragThreshold = 5 // Minimum pixels to move before considering it a drag
const hasMoved = ref(false)

// Grid system constants
const GRID_SIZE_X = 75  // Grid cell width (reduced from 110)
const GRID_SIZE_Y = 90  // Grid cell height (reduced from 90)
const GRID_PADDING_X = 16 // Left padding
const GRID_PADDING_Y = 16 // Top padding

const desktopIconsStore = useDesktopIconsStore()
const localeStore = useLocaleStore()

watchEffect(() => {
  localEntities.value = [...props.entities]
})

const desktopEntities = computed(() => {
  return localEntities.value.filter((entity) => entity.onDesktop)
})

// Initialize icon positions - always use default grid layout (left column)
onMounted(() => {
  desktopEntities.value.forEach((entity, index) => {
    // Always use default grid position (left column, top to bottom)
    const row = index
    const col = 0 // Always left column
    iconPositions.value[entity.id] = {
      x: GRID_PADDING_X + col * GRID_SIZE_X,
      y: GRID_PADDING_Y + row * GRID_SIZE_Y
    }
  })
})

// Check if a grid position is occupied by another icon
const isGridOccupied = (gridX, gridY, excludeIconId = null) => {
  return Object.entries(iconPositions.value).some(([iconId, pos]) => {
    if (iconId === excludeIconId) return false
    return pos.x === gridX && pos.y === gridY
  })
}

// Find nearest available grid position
const findNearestAvailableGrid = (targetX, targetY, iconId) => {
  const snapped = snapToGrid(targetX, targetY)
  
  // If the target position is free, use it
  if (!isGridOccupied(snapped.x, snapped.y, iconId)) {
    return snapped
  }
  
  // Search in a spiral pattern for the nearest available spot
  const maxSearchRadius = 10
  for (let radius = 1; radius <= maxSearchRadius; radius++) {
    // Try positions at this radius
    const positions = [
      { x: snapped.x, y: snapped.y - (radius * GRID_SIZE_Y) }, // up
      { x: snapped.x, y: snapped.y + (radius * GRID_SIZE_Y) }, // down
      { x: snapped.x - (radius * GRID_SIZE_X), y: snapped.y }, // left
      { x: snapped.x + (radius * GRID_SIZE_X), y: snapped.y }, // right
      { x: snapped.x - (radius * GRID_SIZE_X), y: snapped.y - (radius * GRID_SIZE_Y) }, // top-left
      { x: snapped.x + (radius * GRID_SIZE_X), y: snapped.y - (radius * GRID_SIZE_Y) }, // top-right
      { x: snapped.x - (radius * GRID_SIZE_X), y: snapped.y + (radius * GRID_SIZE_Y) }, // bottom-left
      { x: snapped.x + (radius * GRID_SIZE_X), y: snapped.y + (radius * GRID_SIZE_Y) }, // bottom-right
    ]
    
    for (const pos of positions) {
      // Check if within bounds
      if (pos.x >= GRID_PADDING_X && pos.y >= GRID_PADDING_Y &&
          pos.x <= (window.innerWidth - 100) && pos.y <= (window.innerHeight - 120)) {
        if (!isGridOccupied(pos.x, pos.y, iconId)) {
          return pos
        }
      }
    }
  }
  
  // Fallback to original snapped position if no free spot found
  return snapped
}

// Snap position to grid
const snapToGrid = (x, y) => {
  const gridX = Math.round((x - GRID_PADDING_X) / GRID_SIZE_X) * GRID_SIZE_X + GRID_PADDING_X
  const gridY = Math.round((y - GRID_PADDING_Y) / GRID_SIZE_Y) * GRID_SIZE_Y + GRID_PADDING_Y
  
  // Ensure icons stay within viewport bounds
  const maxX = Math.floor((window.innerWidth - 100) / GRID_SIZE_X) * GRID_SIZE_X + GRID_PADDING_X
  const maxY = Math.floor((window.innerHeight - 120) / GRID_SIZE_Y) * GRID_SIZE_Y + GRID_PADDING_Y
  
  return {
    x: Math.max(GRID_PADDING_X, Math.min(gridX, maxX)),
    y: Math.max(GRID_PADDING_Y, Math.min(gridY, maxY))
  }
}

const toggleEffect = (selectedEntity) => {
  localEntities.value.forEach((entity) => {
    entity.isActive = entity.id === selectedEntity.id
  })
}

const removeFilterAndToggle = (entity) => {
  localEntities.value.forEach((e) => {
    e.isActive = false
  })
  emit('toggle-' + entity.id)
}

// Detect if the user is on a mobile device
const isMobile = ref(false)

if (typeof window !== 'undefined') {
  isMobile.value = /Mobi|Android/i.test(navigator.userAgent)
}

// Get localized title
const getLocalizedTitle = (entity) => {
  return entity.title[localeStore.currentLocale] || entity.title['en']
}

// Icon dragging functionality
const startIconDrag = (event, entity) => {
  // Don't drag on mobile - single tap opens, no dragging needed
  if (isMobile.value) return
  
  // Prevent default to avoid text selection
  event.preventDefault()
  
  draggingIcon.value = entity.id
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  
  const currentPos = iconPositions.value[entity.id] || { x: 0, y: 0 }
  dragStartPosX.value = currentPos.x
  dragStartPosY.value = currentPos.y
  hasMoved.value = false
  
  // Set the icon as active while dragging
  toggleEffect(entity)
  
  document.addEventListener('mousemove', onIconDrag)
  document.addEventListener('mouseup', stopIconDrag)
}

const onIconDrag = (event) => {
  if (!draggingIcon.value) return
  
  const deltaX = event.clientX - dragStartX.value
  const deltaY = event.clientY - dragStartY.value
  
  // Check if moved beyond threshold
  if (!hasMoved.value && (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)) {
    hasMoved.value = true
  }
  
  if (hasMoved.value) {
    const newX = Math.max(0, Math.min(dragStartPosX.value + deltaX, window.innerWidth - 100))
    const newY = Math.max(0, Math.min(dragStartPosY.value + deltaY, window.innerHeight - 100))
    
    iconPositions.value[draggingIcon.value] = { x: newX, y: newY }
  }
}

const stopIconDrag = (event) => {
  if (!draggingIcon.value) return
  
  // Find nearest available grid position when releasing
  if (hasMoved.value) {
    const currentPos = iconPositions.value[draggingIcon.value]
    const availablePos = findNearestAvailableGrid(currentPos.x, currentPos.y, draggingIcon.value)
    
    iconPositions.value[draggingIcon.value] = availablePos
    desktopIconsStore.updateIconPosition(draggingIcon.value, availablePos.x, availablePos.y)
  }
  
  document.removeEventListener('mousemove', onIconDrag)
  document.removeEventListener('mouseup', stopIconDrag)
  
  draggingIcon.value = null
  hasMoved.value = false
}

const handleIconClick = (event, entity) => {
  // If we dragged, don't trigger click
  if (hasMoved.value) {
    event.preventDefault()
    return
  }
  
  if (isMobile.value) {
    removeFilterAndToggle(entity)
  } else {
    toggleEffect(entity)
  }
}

const handleIconDoubleClick = (event, entity) => {
  if (!isMobile.value && !hasMoved.value) {
    removeFilterAndToggle(entity)
  }
}

// Get the position style for an icon
const getIconStyle = (entity) => {
  const pos = iconPositions.value[entity.id]
  if (!pos) return {}
  
  return {
    left: `${pos.x}px`,
    top: `${pos.y}px`
  }
}

// Cleanup
onUnmounted(() => {
  document.removeEventListener('mousemove', onIconDrag)
  document.removeEventListener('mouseup', stopIconDrag)
})

// If click occurs somewhere else, remove the active state
window.addEventListener('click', (e) => {
  if (!e.target.closest('.desktop-icon')) {
    localEntities.value.forEach((entity) => {
      entity.isActive = false
    })
  }
})
</script>

<template>
  <section class="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div
      v-for="entity in desktopEntities"
      :key="entity.id"
      class="desktop-icon absolute flex flex-col gap-1 items-center cursor-pointer pointer-events-auto select-none"
      :class="{ 
        active: entity.isActive,
        'cursor-move': !isMobile && draggingIcon === entity.id,
        'cursor-pointer': !isMobile && draggingIcon !== entity.id
      }"
      :style="getIconStyle(entity)"
      @mousedown="startIconDrag($event, entity)"
      @click="handleIconClick($event, entity)"
      @dblclick="handleIconDoubleClick($event, entity)"
    >
      <div class="flex items-center justify-center w-full icon-image-container">
        <img
          class="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 pointer-events-none"
          :style="{
            ...entity.imageStyle,
            filter: entity.isActive ? 'opacity(0.5)' : 'opacity(1)'
          }"
          :src="getAssetPath(entity.imgSrc)"
          :alt="getLocalizedTitle(entity)"
          draggable="false"
        />
      </div>
      <p
        class="text-white text-xxs sm:text-xs font-normal py-px px-1 text-center break-words pointer-events-none icon-label"
        :style="{
          ...entity.textStyle,
          backgroundColor: entity.isActive ? '#0B61FF' : 'transparent',
          textShadow: entity.isActive ? 'none' : '0px 1px 1px rgba(1, 1, 1, 1), 0px 0px 4px #000'
        }"
      >
        {{ getLocalizedTitle(entity) }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.desktop-icon {
  width: 75px;
  transition: all 0.15s ease-out;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.desktop-icon.active {
  z-index: 1;
}

/* Disable transition while dragging for smooth movement */
.desktop-icon:active {
  transition: none;
}

/* Fixed width container for icon images to ensure alignment */
.icon-image-container {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Label container with fixed width */
.icon-label {
  width: 100%;
  max-width: 75px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.2;
}

/* Prevent image dragging */
.desktop-icon img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>

<style scoped>
.touch-target {
  min-height: 60px;
  min-width: 60px;
}

.touch-manipulation {
  touch-action: manipulation;
}

/* Ensure proper grid behavior on small screens */
@media (max-width: 374px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
