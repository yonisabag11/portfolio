<template>
  <div class="text-xs md:text-header-window">
    <div class="flex w-full text-xs items-center justify-center md:justify-start ml-px flex-wrap gap-4 md:min-w-80 md:ml-1 project-tech-stack">
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/react.svg')" :alt="$t('common.icon') + ' React Native'" class="w-9 h-9" />
        <p class="font-bold mt-px">React</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/firebase.svg')" :alt="$t('common.icon') + ' Firebase'" class="w-9 h-9" />
        <p class="font-bold mt-px">Firebase</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/expo.svg')" :alt="$t('common.icon') + ' Expo'" class="w-9 h-9" />
        <p class="font-bold mt-px">Expo</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/javascript.svg')" :alt="$t('common.icon') + ' JavaScript'" class="w-9 h-9" />
        <p class="font-bold mt-px">JavaScript</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/html5.svg')" :alt="$t('common.icon') + ' HTML5'" class="w-9 h-9" />
        <p class="font-bold mt-px">HTML</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/css3.svg')" :alt="$t('common.icon') + ' CSS3'" class="w-9 h-9" />
        <p class="font-bold mt-px">CSS</p>
      </div>
      <div class="flex flex-col items-center flex-wrap">
        <img :src="getAssetPath('/img/icons/projects/tools/vscode.svg')" :alt="$t('common.icon') + ' Visual Studio Code'" class="w-9 h-9" />
        <p class="font-bold mt-px">VsCode</p>
      </div>
    </div>
    <h3 class="mt-5 mb-2 text-md font-bold">{{ $t('common.context') }}</h3>
    <p class="mb-2">{{ $t('project.nourishNet.contextFirstParagraph') }}</p>
    <p class="mb-2">{{ $t('project.nourishNet.contextSecondParagraph') }}</p>
    <p class="mb-2">{{ $t('project.nourishNet.contextThirdParagraph') }}</p>
    <h3 class="mt-5 mb-2 font-bold">{{ $t('common.objectives') }}</h3>
    <ul class="list-disc ml-3">
      <li>{{ $t('project.nourishNet.goalFirst') }}</li>
      <li>{{ $t('project.nourishNet.goalSecond') }}</li>
      <li>{{ $t('project.nourishNet.goalThird') }}</li>
      <li>{{ $t('project.nourishNet.goalFourth') }}</li>
      <li>{{ $t('project.nourishNet.goalFifth') }}</li>
      <li>{{ $t('project.nourishNet.goalSixth') }}</li>
    </ul>
    <h3 class="mt-5 mb-2 font-bold">{{ $t('common.tasksDone') }}</h3>
    <div>
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.nourishNet.tasksDoneFirst') }}</p>
      <p class="mb-2">{{ $t('project.nourishNet.tasksDoneFirstDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.nourishNet.tasksDoneSecond') }}</p>
      <p class="mb-2">{{ $t('project.nourishNet.tasksDoneSecondDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.nourishNet.tasksDoneThird') }}</p>
      <p class="mb-2">{{ $t('project.nourishNet.tasksDoneThirdDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.nourishNet.tasksDoneFourth') }}</p>
      <p class="mb-2">{{ $t('project.nourishNet.tasksDoneFourthDetails') }}</p>
    </div>
    <div class="w-full text-xs justify-center mt-5 mb-2 flex flex-row items-center gap-0.5 cursor-pointer transition-all hover:underline hover:text-heroic-blue hover:fill-heroic-blue">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="fill-current">
        <path
          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
      </svg>
      <a rel="noopener" href="https://github.com/yonisabag11" target="_blank" class="cursor-pointer">{{$t('buttons.linkRepository') }}</a>
    </div>
    <div class="w-full flex items-center flex-col mt-5">
      <div class="w-full">
        <h3 class="mb-2 font-bold">{{ $t('common.design') }}</h3>
      </div>
      <div class="w-full grid grid-cols-3 md:grid-cols-6 gap-3 mb-2">
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet1.webp')" :alt="ProjectName + ' - Screenshot 1'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet2.webp')" :alt="ProjectName + ' - Screenshot 2'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet3.webp')" :alt="ProjectName + ' - Screenshot 3'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet4.webp')" :alt="ProjectName + ' - Screenshot 4'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet5.webp')" :alt="ProjectName + ' - Screenshot 5'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet6.webp')" :alt="ProjectName + ' - Screenshot 6'" class="w-full rounded-lg shadow-lg" />
      </div>
      <div class="w-full grid grid-cols-3 md:grid-cols-6 gap-3 mb-2 mt-4">
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet7.webp')" :alt="ProjectName + ' - Screenshot 7'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet8.webp')" :alt="ProjectName + ' - Screenshot 8'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet9.webp')" :alt="ProjectName + ' - Screenshot 9'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet10.webp')" :alt="ProjectName + ' - Screenshot 10'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet11.webp')" :alt="ProjectName + ' - Screenshot 11'" class="w-full rounded-lg shadow-lg" />
        <img :src="getAssetPath('/img/projects/NourishNet/NourishNet12.webp')" :alt="ProjectName + ' - Screenshot 12'" class="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  </div>
  <a rel="noopener" href="https://github.com/yonisabag11" target="_blank"
    class="absolute bottom-2 right-1 md:right-6 h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked flex items-center justify-center">
    <img :src="getAssetPath('/img/icons/projects/tools/web.svg')" :alt="'View website ' + ProjectName" class="w-3 h-3 mr-0.5" />
    {{ $t('buttons.linkWebSite') }}
  </a>
</template>

<script setup>
import { getAssetPath } from '@/utils/assetPath'

let ProjectName = 'NourishNet';
</script>
