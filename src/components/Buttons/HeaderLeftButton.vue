<template>
  <button class="flex w-full h-10 items-center gap-1.5 px-0.5 component-style hover:text-white cursor-pointer" @click="toggleButton">
    <div class="w-7 h-7 md:w-9 md:h-9 flex-shrink-0">
      <slot name="img" />
    </div>
    <div class="text-left flex-1">
      <h3 class="font-verdana font-semibold text-xs text-left">
        <slot name="title" />
      </h3>
      <p class="small-p text-gray-400 text-left">
        <slot name="subtitle" />
      </p>
    </div>
  </button>
</template>

<script>
export default {
  methods: {
    toggleButton() {
      this.$emit('toggle-button', this.buttonName) // Use 'toggle-button' event
    }
  },
  props: {
    buttonName: String
  }
}
</script>

<style scoped>
.component-style:hover {
  background: #2f71cd;
}

.component-style:hover .small-p {
  color: white;
}
</style>
