import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDesktopIconsStore = defineStore('desktopIcons', () => {
  const iconPositions = ref({})

  // Load positions from localStorage on init
  const loadPositions = () => {
    const saved = localStorage.getItem('desktopIconPositions')
    if (saved) {
      try {
        iconPositions.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse icon positions:', e)
        iconPositions.value = {}
      }
    }
  }

  // Save positions to localStorage
  const savePositions = () => {
    localStorage.setItem('desktopIconPositions', JSON.stringify(iconPositions.value))
  }

  // Update a specific icon's position
  const updateIconPosition = (iconId, x, y) => {
    iconPositions.value[iconId] = { x, y }
    savePositions()
  }

  // Get position for a specific icon
  const getIconPosition = (iconId) => {
    return iconPositions.value[iconId] || null
  }

  // Reset all positions
  const resetAllPositions = () => {
    iconPositions.value = {}
    localStorage.removeItem('desktopIconPositions')
  }

  // Initialize store
  loadPositions()

  return {
    iconPositions,
    loadPositions,
    savePositions,
    updateIconPosition,
    getIconPosition,
    resetAllPositions
  }
})
