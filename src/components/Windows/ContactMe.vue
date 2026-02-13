<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/localeStore'
import { getAssetPath } from '@/utils/assetPath'

import emailjs from 'emailjs-com'
import Button from '../Buttons/Button.vue'

const { t } = useI18n()
const localeStore = useLocaleStore()
const userEmail = ref('')
const emailSubject = ref('')
const userMessage = ref('')
const errorMessage = ref('')
const emailSent = ref(false)
const isLoading = ref(false)
const isFormComplete = ref(false)

// Spam protection
const honeypot = ref('') // Hidden field to catch bots
const lastSentTime = ref(0)
const cooldownRemaining = ref(0)
const COOLDOWN_PERIOD = 5 * 60 * 1000 // 5 minutes in milliseconds
const MAX_MESSAGE_LENGTH = 5000
const MAX_SUBJECT_LENGTH = 200

// Get variables from .env
const adminName = import.meta.env.VITE_APP_ADMIN_NAME
const adminEmailAddress = import.meta.env.VITE_APP_ADMIN_EMAIL_ADDRESS
const publicKey = import.meta.env.VITE_APP_PUBLIC_API_EMAILJS_KEY
const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID

// Load last sent time from localStorage
onMounted(() => {
  const stored = localStorage.getItem('lastEmailSentTime')
  if (stored) {
    lastSentTime.value = parseInt(stored, 10)
    updateCooldown()
  }
})

// Computed property to check if user is in cooldown
const isInCooldown = computed(() => {
  const timePassed = Date.now() - lastSentTime.value
  return timePassed < COOLDOWN_PERIOD
})

// Update cooldown remaining time
const updateCooldown = () => {
  if (isInCooldown.value) {
    cooldownRemaining.value = Math.ceil((COOLDOWN_PERIOD - (Date.now() - lastSentTime.value)) / 1000)
    setTimeout(updateCooldown, 1000)
  } else {
    cooldownRemaining.value = 0
  }
}

// Format cooldown time as MM:SS
const formatCooldownTime = computed(() => {
  const minutes = Math.floor(cooldownRemaining.value / 60)
  const seconds = cooldownRemaining.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const sendEmail = async () => {
  // Anti-spam: Check honeypot field (should be empty)
  if (honeypot.value) {
    console.log('Bot detected via honeypot')
    return // Silently fail for bots
  }

  // Anti-spam: Check rate limiting
  if (isInCooldown.value) {
    emailSent.value = false
    errorMessage.value = t('windows.contact.error.cooldown', { time: formatCooldownTime.value }) || 
      `Please wait ${formatCooldownTime.value} before sending another message.`
    return
  }

  if (!userEmail.value || !userMessage.value || !emailSubject.value) {
    emailSent.value = false
    errorMessage.value = t('windows.contact.error.empty')
    return
  }

  // Check if the email is in a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userEmail.value)) {
    emailSent.value = false
    errorMessage.value = userEmail.value + t('windows.contact.error.email')
    return
  }

  // Anti-spam: Check message length
  if (userMessage.value.length > MAX_MESSAGE_LENGTH) {
    emailSent.value = false
    errorMessage.value = `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`
    return
  }

  // Anti-spam: Check subject length
  if (emailSubject.value.length > MAX_SUBJECT_LENGTH) {
    emailSent.value = false
    errorMessage.value = `Subject too long. Maximum ${MAX_SUBJECT_LENGTH} characters allowed.`
    return
  }

  isLoading.value = true

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_name: adminName,
        subject: emailSubject.value,
        message: userMessage.value,
        reply_to: userEmail.value
      },
      publicKey
    )

    // Set rate limit
    lastSentTime.value = Date.now()
    localStorage.setItem('lastEmailSentTime', lastSentTime.value.toString())
    updateCooldown()

    // Reset form and error message
    errorMessage.value = ''
    userEmail.value = ''
    emailSubject.value = ''
    userMessage.value = ''
    emailSent.value = true
    isLoading.value = false
  } catch (error) {
    console.log(error.text)
    emailSent.value = false
    isLoading.value = false
    errorMessage.value = t('windows.contact.error.unknown') + adminEmailAddress
  }
}

// Expose variables to the template
defineExpose({
  userEmail,
  userMessage,
  emailSubject,
  errorMessage,
  emailSent,
  sendEmail
})

// Change cursor to wait when loading
watch(isLoading, (newValue) => {
  if (newValue) {
    document.body.classList.add('cursor-wait')
  } else {
    document.body.classList.remove('cursor-wait')
  }
})

watch([userEmail, userMessage, emailSubject], ([newUserEmail, newUserMessage, newEmailSubject]) => {
  if (newUserEmail && newUserMessage && newEmailSubject) {
    isFormComplete.value = true
  } else {
    isFormComplete.value = false
  }
})
</script>

<template>
  <form class="relative right-0 h-full flex flex-col h-content-headless-toolbox">
    <!-- Header tools -->
    <div class="bg-window-white border-window-header-bot w-full h-12 py-1 flex items-center px-1 text-xxs gap-0.5">
      <button
        :disabled="isLoading || !isFormComplete || isInCooldown"
        @click="sendEmail"
        :isLoading="isLoading"
        class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img :src="getAssetPath('/img/icons/contact/send-icon.webp')" :alt="$t('windows.contact.send')" :class="[isFormComplete && !isInCooldown ? 'w-8' : 'filter grayscale w-8']" />
        <p>{{ $t('windows.contact.send') }}</p>
      </button>
      <div class="h-full w-px bg-gray-192 mx-1 md:mx-0.5" />
      <div class="flex gap-px">
        <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
          <img :src="getAssetPath('/img/icons/contact/cut-icon.webp')" :alt="$t('windows.contact.cut')" class="w-4 filter grayscale" />
          <p>{{ $t('windows.contact.cut') }}</p>
        </div>
        <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
          <img :src="getAssetPath('/img/icons/contact/copy-icon.webp')" :alt="$t('windows.contact.copy')" class="w-4 filter grayscale" />
          <p>{{ $t('windows.contact.copy') }}</p>
        </div>
        <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
          <img :src="getAssetPath('/img/icons/contact/paste-icon.webp')" :alt="$t('windows.contact.paste')" class="w-4 filter grayscale" />
          <p>{{ $t('windows.contact.paste') }}</p>
        </div>
        <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
          <img :src="getAssetPath('/img/icons/contact/undo-icon.webp')" :alt="$t('windows.contact.undo')" class="w-4 filter grayscale" />
          <p>{{ $t('windows.contact.undo') }}</p>
        </div>
      </div>
      <div class="h-full w-px bg-gray-192 mx-1 md:mx-0.5" />
      <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
        <img :src="getAssetPath('/img/icons/contact/check-icon.webp')" :alt="$t('windows.contact.check')" class="w-6" />
        <p>{{ $t('windows.contact.check') }}</p>
      </div>
      <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
        <img :src="getAssetPath('/img/icons/contact/spelling-icon.webp')" :alt="$t('windows.contact.spelling')" class="w-5" />
        <p>{{ $t('windows.contact.spelling') }}</p>
      </div>
      <div class="h-full w-px bg-gray-192 mx-1 md:mx-0.5" />
      <div class="flex items-center rounded-sm justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
        <img :src="getAssetPath('/img/icons/contact/attach-icon.webp')" :alt="$t('windows.contact.attach')" class="w-5" />
        <p>{{ $t('windows.contact.attach') }}</p>
      </div>
      <div class="flex justify-center items-center rounded-sm px-1 py-1 hover:border-gray-300 hover:shadow-header-tools">
        <div class="flex items-center justify-center cursor-pointer flex-col">
          <img :src="getAssetPath('/img/icons/contact/priority-icon.webp')" :alt="$t('windows.contact.priority')" class="w-5" />
          <p>{{ $t('windows.contact.priority') }}</p>
        </div>
        <div class="block border-solid down-arrow ml-3"></div>
      </div>
      <div class="h-full w-px bg-gray-192 mx-1 md:mx-0.5" />
      <div class="flex items-center justify-center px-2 py-1 cursor-pointer flex-col hover:border-gray-300 hover:shadow-header-tools">
        <img :src="getAssetPath('/img/icons/contact/sign-icon.webp')" :alt="$t('windows.contact.sign')" class="w-6" />
        <p>{{ $t('windows.contact.sign') }}</p>
      </div>
    </div>
    <!-- Header content -->
    <div class="bg-window-white border-window-header-bot w-full h-18 flex items-center flex-col p-2 text-xxs gap-2">
      <label class="w-full flex gap-2 font-trebuchet-pixel">
        <div class="flex gap-1 w-14 items-center cursor-default">
          <img :src="getAssetPath('/img/icons/contact/mailto-icon.webp')" :alt="$t('windows.contact.to')" class="w-4 h-4" />
          <p class="font-trebuchet-pixel">{{ $t('windows.contact.to') }}</p>
        </div>
        <input
          type="text"
          class="w-full h-5 border border-input-blue p-1.5 text-xs outline-none placeholder:text-black"
          placeholder="yonisabag11@gmail.com"
          readonly="readonly"
        />
      </label>
      <label class="w-full flex gap-2">
        <div class="flex gap-1 w-14 items-center cursor-default">
          <img :src="getAssetPath('/img/icons/contact/mailto-icon.webp')" :alt="$t('windows.contact.from')" class="w-4 h-4" />
          <p class="font-trebuchet-pixel">{{ $t('windows.contact.from') }}</p>
        </div>
        <input
          v-model="userEmail"
          type="email"
          class="w-full h-5 border border-input-blue p-1.5 text-xs outline-none font-trebuchet-pixel"
          placeholder="jean_doe@wanadoo.com"
        />
      </label>
      <label class="w-full flex gap-2">
        <div class="flex gap-1 w-14 items-center justify-center font-trebuchet-pixel cursor-default">
          {{ $t('windows.contact.subject') }}
        </div>
        <input type="text" v-model="emailSubject" class="w-full h-5 border border-input-blue p-1.5 text-xs outline-none font-trebuchet-pixel" :maxlength="MAX_SUBJECT_LENGTH" />
      </label>
      
      <!-- Honeypot field - hidden from users, catches bots -->
      <input 
        type="text" 
        v-model="honeypot" 
        name="website" 
        autocomplete="off"
        tabindex="-1"
        aria-hidden="true"
        style="position: absolute; left: -9999px; width: 1px; height: 1px;"
      />
    </div>
    <!-- Main content -->
    <div class="flex flex-col w-full h-content-contact bg-white overflow-auto gap-2 font-trebuchet-pixel">
      <div class="m-2 flex-1 flex flex-col">
        <div class="flex-1 w-full">
          <textarea
            v-model="userMessage"
            class="w-full h-full min-h-40 border border-input-blue p-2 text-xs outline-none resize-none"
            :class="{ 'text-right': localeStore.currentLocale === 'he' }"
            :placeholder="$t('windows.contact.msgPlaceholder')"
            :dir="localeStore.currentLocale === 'he' ? 'rtl' : 'ltr'"
            :maxlength="MAX_MESSAGE_LENGTH"
          ></textarea>
          <p class="text-xxs text-gray-500 mt-1">
            {{ userMessage.length }} / {{ MAX_MESSAGE_LENGTH }} {{ $t('windows.contact.characters') || 'characters' }}
          </p>
        </div>
        <p class="text-xs font-trebuchet-pixel italic mb-2 mt-2">
          {{ $t('windows.contact.description') }}
        </p>
        <div class="flex gap-2 items-center flex-wrap">
          <p class="text-xs text-green-600 font-medium" v-show="emailSent">
            {{ $t('windows.contact.success') }}
          </p>
          <p class="text-xs text-red font-medium" v-show="errorMessage">{{ errorMessage }}</p>
          <p class="text-xs text-orange-600 font-medium" v-show="isInCooldown && !errorMessage">
            ⏳ {{ $t('windows.contact.cooldownWait') || 'Please wait' }} {{ formatCooldownTime }} {{ $t('windows.contact.beforeSending') || 'before sending another message' }}
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.down-arrow {
  content: '';
  border-width: 3px 3px 0px;
  border-color: rgb(0, 0, 0) transparent;
}
</style>
