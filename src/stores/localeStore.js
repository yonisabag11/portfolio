import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: localStorage.getItem('currentLocale') || 'en'
  }),
  actions: {
    setLocale(newLocale) {
      this.currentLocale = newLocale
      localStorage.setItem('currentLocale', newLocale)
      
      // Set language attribute and data attribute for text direction
      document.documentElement.setAttribute('lang', newLocale)
      document.documentElement.setAttribute('data-lang', newLocale)
    }
  }
})
