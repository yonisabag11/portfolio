<template>
  <section class="text-xs md:text-header-window flex flex-col items-center justify-center">
    <iframe 
      width="600" 
      height="338" 
      src="https://www.youtube.com/embed/pGY4mosWue8" 
      title="Yoni Sabag - Men Soccer Highlight" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen
      class="mt-5"
    ></iframe>
    <p class="mt-5 text-center text-sm">{{ $t('project.footballClips.funMessage') }}</p>
  </section>
</template>

<script setup>
let ProjectName = 'Football Clips';
</script>

