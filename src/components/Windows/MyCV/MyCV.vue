<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import ProfileHeader from './ProfileHeader.vue'
import EducationItem from './EducationItem.vue'
import cvData from '@/data/cv-data.json'
import WorkExperienceItem from './WorkExperienceItem.vue'

const localeStore = useLocaleStore()
const birthdate = new Date(1999, 1, 14) // February 14, 1999 (month index 1 = February, starting at 0)
const today = new Date()
let age = ref(today.getFullYear() - birthdate.getFullYear())

// Adjust age if the current date has not passed the birthdate in the current year
if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
  age.value--
}

const currentLocale = computed(() => localeStore.currentLocale)

// Computed property to get the localized education data
const educationData = computed(() => {
  return cvData[currentLocale.value]?.education || []
})

// Computed property to get the localized work experience data
const experienceData = computed(() => {
  return cvData[currentLocale.value]?.workExperience || []
})

// Computed property to get the localized projects data
const projectsData = computed(() => {
  return cvData[currentLocale.value]?.projects || []
})

// Computed property to get the localized technical skills data
const technicalSkills = computed(() => {
  return cvData[currentLocale.value]?.technicalSkills || {}
})

// Computed property to get the localized summary
const summary = computed(() => {
  return cvData[currentLocale.value]?.summary || ''
})

// Computed property to get the localized spoken languages
const spokenLanguages = computed(() => {
  return cvData[currentLocale.value]?.spokenLanguages || ''
})
</script>

<template>
  <div class="relative right-0 h-content-window overflow-hidden">
    <div class="w-full h-full bg-white overflow-auto p-2">
      <div>
        <ProfileHeader :age="age" />
        <section class="mt-3" v-if="summary">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.summary') }}</h2>
          <p class="font-trebuchet-pixel text-xs mt-1">{{ summary }}</p>
        </section>
        <section class="mt-5" v-if="technicalSkills.languages">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.technicalSkills') }}</h2>
          <div class="mt-2">
            <p class="font-trebuchet-pixel text-xs"> {{ $t('windows.cv.languages') }}: {{ technicalSkills.languages }}</p>
            <p class="font-trebuchet-pixel text-xs mt-1"> {{ $t('windows.cv.frameworks') }}: {{ technicalSkills.frameworks }}</p>
          </div>
        </section>
        <div class="mt-3">
          <h2 class="font-trebuchet-pixel mt-5 underline">{{ $t('windows.cv.proExperience') }}</h2>
          <WorkExperienceItem v-for="(workExperience, index) in experienceData" :key="index" :workExperience="workExperience" />
        </div>
        <section class="mt-5" v-if="projectsData.length > 0">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.projects') }}</h2>
          <div v-for="(project, index) in projectsData" :key="index" class="mt-2">
            <h4 class="font-trebuchet-pixel uppercase text-xs">{{ project.name }}<span v-if="project.subtitle" class="normal-case"> - {{ project.subtitle }}</span></h4>
            <ul class="list-disc list-inside mt-1">
              <li v-for="(desc, i) in project.description" :key="i" class="font-trebuchet-pixel text-xs">{{ desc }}</li>
            </ul>
          </div>
        </section>
        <section class="mt-5">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.education') }}</h2>
          <EducationItem v-for="education in educationData" :key="education.id" :education="education" />
        </section>
        <section class="mt-5" v-if="spokenLanguages">
          <h2 class="font-trebuchet-pixel underline">{{ $t('windows.cv.spokenLanguages') }}</h2>
          <p class="font-trebuchet-pixel text-xs mt-2">{{ spokenLanguages }}</p>
        </section>
      </div>
    </div>
  </div>
  <a
    rel="noopener"
    :href="'pdf/CV_yoni_sabag_' + localeStore.currentLocale + '.pdf'"
    :download="'CV_yoni_sabag_' + localeStore.currentLocale + '.pdf'"
    class="absolute bottom-2 right-1 md:right-4 h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked"
  >
    {{ $t('buttons.downloadCV') }}
  </a>
</template>
