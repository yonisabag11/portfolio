# How to Add a New Project to Portfolio

This guide explains how to add a new project to the portfolio website in the "Websites" category (or any other category). Follow these steps to ensure consistency across all projects.

## Step-by-Step Guide

### 1. Prepare Your Project Icon
- **Location**: `public/img/icons/projects/`
- **Format**: `.webp` file
- **Naming Convention**: `folder-[project-name]-icon.webp`
- **Example**: `folder-discrete-math-escape-room-icon.webp`

Save your project icon image to the projects icons folder with the appropriate name.

### 2. Prepare Project Images/Screenshots (Optional)
- **Location**: `public/img/projects/[ProjectFolderName]/`
- **Format**: `.webp` file
- **Example**: `public/img/projects/DiscreteMathEscapeRoom/discrete-math-escape-room-icon.webp`

Create a dedicated folder for your project inside `public/img/projects/` to store screenshots, preview images, and other media assets.

---

### 3. Add Project Entry to Data File
**File**: `src/data/projects-data.json`

Add a new project object to the appropriate category's `projects` array:

```json
{
  "name": "Project Name",
  "icon": "projects/folder-[project-name]-icon.webp",
  "title": {
    "en": "Project Name - Type",
    "he": "Hebrew Title - Hebrew Type"
  },
  "date": {
    "en": "Month YYYY - Month YYYY",
    "he": "Hebrew Month YYYY - Hebrew Month YYYY"
  },
  "componentName": "ProjectNameContent",
  "isFocus": false,
  "isActive": false
}
```

**⚠️ CRITICAL - Project Name Structure:**
- **`name`** MUST be a **simple string** (e.g., `"Project Name"`), NOT an object with translations
- This is required for the click detection to work properly
- Only `title` and `date` should have translation objects with `"en"` and `"he"` keys
- The display name in different languages comes from the `title` property

**Important Notes**: 
- The `icon` path is relative to `public/img/icons/`
- `componentName` must match the Vue component filename (without `.vue`)
- Keep `isFocus` and `isActive` as `false` for new projects

---

### 4. Create Vue Component
**Location**: `src/components/Windows/MyProjects/`
**Naming**: `[ComponentName]Content.vue`

Use this template structure (based on Discrete Math Escape Room example)

**Location**: `src/components/Windows/MyProjects/`
**Naming**: `[ComponentName]Content.vue`

**⚠️ CRITICAL - Template Wrapper:**
- **MUST use `<section>` as the wrapper**, NOT `<div>`
- The website link button (if present) must be positioned **outside the main `<section>` but inside `<template>`**
- This structure is required for proper rendering and click detection

Use this template structure:

```vue
<template>
  <section class="text-xs md:text-header-window">
    <!-- Tools/Technologies Section -->
    <div class="flex w-full text-xs items-center justify-center md:justify-start ml-px flex-wrap gap-4 md:min-w-80 md:ml-1">
      <div class="flex flex-col items-center flex-wrap">
        <img src="/img/icons/projects/tools/[tool].svg" :alt="$t('common.icon') + ' [tool]'" class="w-9 h-9" />
        <p class="font-bold mt-px">Tool Name</p>
      </div>
      <!-- Add more tools as needed -->
    </div>

    <!-- Context Section -->
    <h3 class="mt-5 mb-2 text-md">{{ $t('common.context') }}</h3>
    <p class="mb-2">{{ $t('project.[projectKey].contextFirstParagraph') }}</p>
    <p class="mb-2">{{ $t('project.[projectKey].contextSecondParagraph') }}</p>
    <p class="mb-2">{{ $t('project.[projectKey].contextThirdParagraph') }}</p>

    <!-- Objectives Section -->
    <h3 class="mt-5 mb-2">{{ $t('common.objectives') }}</h3>
    <ul class="list-disc ml-3">
      <li>{{ $t('project.[projectKey].goalFirst') }}</li>
      <li>{{ $t('project.[projectKey].goalSecond') }}</li>
      <li>{{ $t('project.[projectKey].goalThird') }}</li>
      <li>{{ $t('project.[projectKey].goalFourth') }}</li>
      <li>{{ $t('project.[projectKey].goalFifth') }}</li>
      <li>{{ $t('project.[projectKey].goalSixth') }}</li>
    </ul>

    <!-- Tasks Done Section -->
    <h3 class="mt-5 mb-2">{{ $t('common.tasksDone') }}</h3>
    <div>
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.[projectKey].tasksDoneFirst') }}</p>
      <p class="mb-2">{{ $t('project.[projectKey].tasksDoneFirstDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.[projectKey].tasksDoneSecond') }}</p>
      <p class="mb-2">{{ $t('project.[projectKey].tasksDoneSecondDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.[projectKey].tasksDoneThird') }}</p>
      <p class="mb-2">{{ $t('project.[projectKey].tasksDoneThirdDetails') }}</p>
    </div>
    <div class="mt-5 mb-2">
      <p class="font-semibold italic text-gray-500 mb-2">{{ $t('project.[projectKey].tasksDoneFourth') }}</p>
      <p class="mb-2">{{ $t('project.[projectKey].tasksDoneFourthDetails') }}</p>
    </div>

    <!-- Images/Screenshots (optional) -->
    <div class="w-full flex items-center flex-col mt-5">
      <div class="w-full">
        <h3 class="mb-2">{{ $t('common.design') }}</h3>
      </div>
      <div class="w-full max-w-[750px] mb-2">
        <img src="/img/projects/[ProjectFolderName]/[image-name].webp" :alt="ProjectName + ' - Preview'" class="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  </section>
  <!-- NOTE: Website button is OUTSIDE the main section but INSIDE template -->
  <a rel="noopener" href="https://project-url.com" target="_blank"
    class="absolute bottom-2 right-1 md:right-6 h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked flex items-center justify-center">
    <img src="/img/icons/projects/tools/web.svg" :alt="'View website ' + ProjectName" class="w-3 h-3 mr-0.5" />
    {{ $t('buttons.linkWebSite') }}
  </a>
</template>

<script setup>
let ProjectName = 'Your Project Name';
</script>
```

**Component Structure Rules:**
1. Main wrapper MUST be `<section>`, not `<div>`
2. Website link button (if needed) goes AFTER the closing `</section>` but BEFORE `</template>`
3. Button uses `position: absolute` to stay at bottom-right
4. If no website button needed, just close with `</section></template>`

**⚠️ IMPORTANT - Don't Forget:**
1. **Design/Preview Section**: Always add a design section with at least a placeholder image (can use the project icon)
   - Use `/img/icons/projects/folder-[project-name].webp` as placeholder initially
   - Replace with actual screenshots when available in `/img/projects/[ProjectFolderName]/`
2. **Website Button**: Include the website button at bottom-right even if using a placeholder URL
   - Update the href to actual URL when project is live
   - Remove entirely if project has no website
3. **Name Translation**: Remember that `name` is a simple string for click detection, while `title` handles all display translations
   - Project cards display the `title` property (which has translations)
   - Internal click handling uses `name` property (simple string only)

---

### 5. Register Component in MyProjects.vue

**⚠️ CRITICAL STEP - Component won't load without this!**

**File**: `src/components/Windows/MyProjects.vue`

You must add two things:

1. **Import the component** at the top:
```javascript
import GameAssetAiAgentContent from './MyProjects/GameAssetAiAgentContent.vue'
```

2. **Add to componentMap** object:
```javascript
const componentMap = {
  HomeserverContent,
  ClenchContent,
  LogmaContent,
  PangaiaContent,
  Emc2Content,
  FannyContent,
  AidellaContent,
  DiscreteMathEscapeRoomContent,
  MazeEscapeContent,
  NourishNetContent,
  GameAssetAiAgentContent  // <- Add your component here
}
```

**Why this is needed**: The componentMap is used to dynamically load components based on the `componentName` in `projects-data.json`. Without this registration, Vue won't know which component to render.

---

### 6. Add Translations

Add translations for all three languages under the `"project"` object. Use a descriptive key (e.g., "discreteMath", "aidella", "pangaia").

### 4. Add Translations

#### English (`src/locales/en.json`)
Add to the `"project"` object:

```json
"projectKey": {
  "contextFirstParagraph": "First context paragraph...",
  "contextSecondParagraph": "Second context paragraph...",
  "contextThirdParagraph": "Third context paragraph...",
  "goalFirst": "First objective...",
  "goalSecond": "Second objective...",
  "goalThird": "Third objective...",
  "goalFourth": "Fourth objective...",
  "goalFifth": "Fifth objective...",
  "goalSixth": "Sixth objective...",
  "tasksDoneFirst": "First task title",
  "tasksDoneFirstDetails": "First task details...",
  "tasksDoneSecond": "Second task title",
  "tasksDoneSecondDetails": "Second task details...",
  "tasksDoneThird": "Third task title",
  "tasksDoneThirdDetails": "Third task details...",
  "tasksDoneFourth": "Fourth task title",
  "tasksDoneFourthDetails": "Fourth task details..."
}French translations to the `"project"` object with the same structure.

---

### 
```

#### Hebrew (`src/locales/he.json`)
Add Hebrew translations to the `"project"` object with the same structure.

#### French (`src/locales/fr.json`)
Add 6. Register Component in MyProjects.vue
**File**: `src/components/Windows/MyProjects.vue`

**Step 6a**: Import the component at the top of the `<script setup>` section:
```javascript
import YourProjectContent from './MyProjects/YourProjectContent.vue'
```

**Step 6b**: Add to the `componentMap` object:
```javascript
const componentMap = {
  HomeserverContent,
  ClenchContent,
  LogmaContent,
  PangaiaContent,
  Emc2Content,
  FannyContent,
  AidellaContent,
  DiscreteMathEscapeRooiaContent,
  Emc2Content,
  FannyContent,
  AidellaContent,
  CatHmmContent,
  YourProjectContent  // Add your new component here
}
```

---

## Available Tool Icons

Tools icons are located in `public/img/icons/projects/tools/`. Common ones include:

- `vuejs.svg` - Vue.js
- `laravel.svg` - Laravel
- `tailwind.svg` - Tailwind CSS
- `vscode.svg` - Visual Studio Code
- `docker.svg` - Docker
- `jenkins.svg` - Jenkins
- `sonarqube.svg` - SonarQube
- `github.svg` - GitHub
- `godot.svg` - Godot Engine
- `workbench.svg` - MySQL Workbench
- `gnu.svg` - GNU/Makefile
- `mariadb.svg` - MariaDB
- `swagger.svg` - Swagger
- `postman.svg` - Postman
- `orchid.svg` - Laravel Orchid
- And more...

Check the `tools/` folder for all available icons.

- [ ] Icon image prepared and saved to `public/img/icons/projects/folder-[name]-icon.webp`
- [ ] Project images/screenshots saved to `public/img/projects/[ProjectFolderName]/` (if needed)
- [ ] Project entry added to `projects-data.json` with:
  - [ ] ⚠️ **`name` as a simple STRING** (e.g., `"Project Name"`)
  - [ ] `icon` path pointing to icon file
  - [ ] `title` with `en` and `he` translations
  - [ ] `date` with `en` and `he` (use full month names)
  - [ ] Correct `componentName` matching your Vue file
  - [ ] `isFocus: false` and `isActive: false`
- [ ] Vue component created in `src/components/Windows/MyProjects/[ComponentName]Content.vue` with:
  - [ ] ⚠️ **Main wrapper is `<div>`, NOT `<section>`**
  - [ ] Tools/technologies section
  - [ ] Context (3 paragraphs)
  - [ ] Objectives (6 items)
  - [ ] Tasks Done (4 subsections with titles and details)
  - [ ] ⚠️ **Design section with preview image** (use icon as placeholder: `/img/icons/projects/folder-[name].webp`)
  - [ ] ⚠️ **Website button positioned outside `</div>` but inside `</template>`** (use placeholder URL initially)
- [ ] English translations added to `src/locales/en.json` under `"project.[projectKey]"`
- [ ] Hebrew translations added to `src/locales/he.json` under `"project.[projectKey]"`
- [ ] French translations added to `src/locales/fr.json` under `"project.[projectKey]"`
- [ ] Component imported in `MyProjects.vue`
- [ ] Component added to `componentMap` in `MyProjects.vue`

---

## Important Notes & Tips

### 1. **⚠️ CRITICAL: Project Name Structure**
   - The `name` field in `projects-data.json` **MUST be a simple STRING**, not an object
   - ❌ **WRONG**: `"name": {"en": "My Project", "he": "הפרויקט שלי"}`
   - ✅ **CORRECT**: `"name": "My Project"`
   - The `name` is used for internal click detection only
   - Display translations come from the `title` field (which has `en`, `he`, `fr` objects)
   - When language is switched, project cards display the translated `title`, not the `name`
### 2. **⚠️ CRITICAL: Component Template Structure**
   - Main wrapper **MUST be `<div>`**, not `<section>`
   - ❌ **WRONG**: `<template><section>...</section></template>`
   - ✅ **CORRECT**: `<template><div>...</div></template>`
   - Website button (if present) goes **OUTSIDE** the main `</div>` but **INSIDE** `</template>`
   - This structure is required for proper rendering

### 3. **Date Format**
   - Use full month names in dates, not abbreviations
   - Example: "September 2025 - December 2025" not "Sep 2025 - Dec 2025"

### 4. **Translation Keys**
   - Use descriptive, unique keys for each project (e.g., "discreteMath", not "project1")
   - Keep consistent structure across all three language files (en, he, fr)

### 6. **Component Content Structure - Required Sections**
   - Always include 3 context paragraphs
   - Always include 6 objectives
   - Include 4 task subsections (each with title and details)
   - **Always include design/preview section** with image (use icon as placeholder)
   - **Always include website button** at bottom-right (use placeholder URL, remove only if truly no website)
   - Use consistent class names and styling as shown in the template

### 6. **Image Paths**
   - Project icons: `public/img/icons/projects/folder-[name]-icon.webp` (used in project list)
   - Project images: `public/img/projects/[ProjectFolderName]/` (used in detail view)

### 7. **Tools Display**
   - Only add tools/technologies actually used in the project

### 8. **Optional Sections**
   Common Mistakes to Avoid

1. ❌ **Using object for `name`** - Will break click detection and prevent translations from showing
   - The `title` field provides translations, not `name`
2. ❌ **Using `<section>` wrapper** - Will cause rendering issues
3. ❌ **Placing button inside main div** - Will interfere with scrolling
4. ❌ **Forgetting to add component to `componentMap`** - Component won't load
5. ❌ **Inconsistent translation keys** - Will show missing translation warnings
6. ❌ **Wrong icon path format** - Icons won't display in project list
7. ❌ **Forgetting design/preview section** - Projects look incomplete without images
8. ❌ **Not adding website button** - Consider adding with placeholder URL even if not live yet

---

## Example: Minimal Working Project

```json
// projects-data.json
{
  "name": "My Project",
  "icon": "projects/folder-myproject-icon.webp",
  "title": {
    "en": "My Project - Web App",
    "he": "הפרויקט שלי - אפליקציית רשת"
  },
  "date": {
    "en": "January 2026",
    "he": "ינואר 2026"
  },
  "componentName": "MyProjectContent",
  "isFocus": false,
  "isActive": false
}
```

```vue
<!-- MyProjectContent.vue -->
<template>
  <div class="text-xs md:text-header-window">
    <h3 class="mt-5 mb-2">{{ $t('common.context') }}</h3>
    <p class="mb-2">{{ $t('project.myProject.contextFirstParagraph') }}</p>
    <!-- Add more content here -->
  </div>
</template>

<script setup>
let ProjectName = 'My Project';
</script>
``

7. **Optional Sections**: Not all projects need website buttons - only add what's relevant

8. **Buttons**: Website buttons use absolute positioning at `bottom-2 right-1 md:right-6
---

## Tips

1. **Image Paths**: Project images/screenshots go in `public/img/projects/[ProjectFolderName]/` not in the icons folder
5. **Tools Display**: Only add tools/technologies actually used in the project
6. **Optional Sections**: Not all projects need GitHub links or website buttons - only add what's relevant
7. **Folder Structure**: 
   - Icons: `public/img/icons/projects/folder-[name]-icon.webp` (used in project list)
   - Images: `public/img/projects/[ProjectFolderName]/` (used in project detail view)`"/img/icons/projects/"`
4. **Tools Display**: Only add tools/technologies actually used in the project
5. **Optional Sections**: Not all projects need GitHub links or website buttons - only add what's relevant
6. **Images**: Store project screenshots in `public/img/projects/[project-folder]/`

---

*Last Updated: January 26, 2026*
