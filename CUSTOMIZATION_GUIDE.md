# Portfolio Customization Guide

This document lists all the files and content that need to be customized to make this portfolio your own. The original portfolio belongs to **Paul Jaguin** and contains his personal information, projects, resume, and social links.

---

## 🔴 CRITICAL - Personal Information Files

### 1. **package.json**
- **Line 5**: `"author": "Paul Jaguin <paul@rocketegg.systems>"` → Change to your name and email
- **Line 7**: `"homepage": "https://pauljaguin.com"` → Change to your domain

### 2. **index.html**
- **Line 4**: Title: `"Portfolio | Paul Jaguin - Développeur Web"` → Change to your name and title
- **Line 5**: Meta description mentions Paul Jaguin → Update to your description
- **Lines 8-16**: All Open Graph meta tags reference Paul Jaguin → Update all with your info
- **Line 10**: URL: `"https://pauljaguin.com"` → Change to your domain
- **Line 11**: Image: `"https://pauljaguin.com/img/logo-portfolio-black.webp"` → Update to your logo
- **Lines 18-22**: All Twitter card meta tags → Update with your info

### 3. **README.md**
- **Line 4-5**: Remove/update SonarQube badges (links to `sonarqube.rocketegg.systems`)
- **Line 6-8**: Update GitHub badges to point to your repo (currently `UnMugViolet/portfolio`)
- **Line 14**: Website URL: `https://pauljaguin.com` → Change to your domain
- **Line 61**: Jenkins deployment section mentions personal server setup → Update or remove
- **Lines 94-118**: Docker compose example → Update image name from `unmugviolet/portfolio-xp:latest`

### 4. **LICENSE**
- **Line 3**: `"Copyright (c) 2024 Paul Jaguin"` → Change to your name

---

## 🔵 Configuration & Deployment Files

### 5. **src/router/index.js**
- **Lines 13, 21, 34, 54, 58, 66, 86, 90**: All meta titles reference "Paul Jaguin"
- **Lines 17, 102**: Canonical URL: `https://pauljaguin.com`
- **Lines 26, 71**: Meta descriptions mention Paul Jaguin
- **Lines 30, 75**: Meta keywords include "paul jaguin"
- **Line 75**: Twitter/OG image: `https://pauljaguin.com/img/logo-portfolio-black.webp`

### 6. **src/main.js**
- **Line 35**: Matomo analytics host: `https://matomo.rocketegg.systems` → Update or remove

### 7. **Jenkinsfile**
- **Line 8**: Docker registry: `DOCKER_REGISTRY = 'unmugviolet'` → Change to your Docker Hub username
- **Line 15**: Git URL: `https://github.com/UnMugViolet/portfolio.git` → Change to your repo
- **Lines 86-103**: SSH deployment configuration → Update or remove entirely

### 8. **sonar-project.properties**
- **Line 2**: `sonar.projectKey=PortfolioXp` → Change to your project key
- Consider removing this file if you don't use SonarQube

### 9. **public/sitemap.xml**
- **Lines 6, 12**: All URLs reference `https://pauljaguin.com` → Update to your domain

---

## 🟡 Resume/CV Data Files

### 10. **src/data/cv-data.json**
**This file contains Paul's entire work history and education. Replace ALL content with your own:**

**French version (fr):**
- **Lines 3-33**: Education history (42 Paris, MyDigitalSchool, etc.)
- **Lines 34-94**: Work experience (Screenup, Pangaia, Tessi, ACLP, etc.)

**English version (en):**
- **Lines 97-127**: Education history
- **Lines 128-188**: Work experience

All of this needs to be replaced with your actual education and work experience.

---

## 🟢 Project Portfolio Data

### 11. **src/data/projects-data.json**
**Replace all project entries with your own projects:**
- **Lines 7-36**: "Logma Production" project
- **Lines 37-48**: "Pangaia" project  
- **Lines 49-60**: "Clench" project
- **Lines 61-72**: "EMC2 (ScreenUp)" project
- **Lines 73-84**: "Aidella" project
- **Lines 85-96**: "Portfolio Fanny" project
- **Lines 104-116**: "Homeserver" project

**Note:** You mentioned wanting to add your Doom and Minesweeper games. These are already present in the repo under `public/game/` but you'll need to add them to the projects list.

### 12. **src/data/playlist-data.json**
- **Line 2**: Playlist name: `"Portfolio - Playlist"`
- **Lines 3-7**: Playlist image and Spotify links
- **Lines 11-569**: Entire music playlist → Replace with your own music preferences or remove the music feature

### 13. **src/data/pictures-data.json**
**Replace all personal photos:**
- Photos show places like Colette, Paris, Rennes, Lorient, Berlin, Gdansk, Poznan, Warsaw
- Replace these with your own photos in `/public/img/icons/pictures/carroussel/`

---

## 🟣 Vue Component Files

### 14. **src/components/Loading/LoginForm.vue**
- **Line 21**: `<h2 class="text-xl md:text-2xl">Paul</h2>` → Change to your first name

### 15. **src/components/Header/Header.vue**
- **Line 7**: `<h2 class="text-lg ml-2 text-white text-shadow-header">Paul Jaguin</h2>` → Change to your name

### 16. **src/components/Windows/MyCV/ProfileHeader.vue**
- **Line 9**: Profile photo: `"/img/icons/cv/paul-jaguin-photo-cv.webp"` → Replace with your photo
- **Line 11**: `<h1 class="font-trebuchet-pixel">Paul Jaguin</h1>` → Change to your name

### 17. **src/components/Windows/MyCV/MyCV.vue**
- **Lines 50-51**: PDF CV download links reference `CV_paul_jaguin_` → Update to your CV filename

### 18. **src/components/Windows/ContactMe.vue**
- **Line 166**: Placeholder email: `"jaguinpaul@gmail.com"` → Change to your email

### 19. **src/components/Windows/Documents/Legal.vue**
- **Line 23**: Contact email: `contact@pauljaguin.com` → Change to your email

### 20. **src/components/ProfilePicture.vue**
- Currently uses `bg-profile-pic` CSS class
- Check **tailwind.config.js** or CSS files for where this background image is defined
- Replace with your profile picture

---

## 🔴 Project Content Components (Vue Files)

### 21. **src/components/Windows/MyProjects/LogmaContent.vue**
- **Line 57**: GitHub link: `https://github.com/UnMugViolet/Logma` → Update or remove

### 22. **src/components/Windows/MyProjects/FannyContent.vue**
- **Line 59**: GitHub link: `https://github.com/UnMugViolet/Fanny_portfolio` → Update or remove

### 23. **src/components/Windows/MyProjects/ClenchContent.vue**
- **Line 39**: GitHub link: `https://github.com/UnMugViolet/clench-fakeapp` → Update or remove

### 24. **src/components/Windows/MyProjects/AidellaContent.vue**
- **Line 104**: GitHub link: `https://github.com/UnMugViolet/aidella` → Update or remove

### 25. **src/components/Windows/MyProjects/HomeserverContent.vue**
- **Line 144**: Homepage link: `https://homepage.rocketegg.systems` → Update or remove

---

## 🟠 Localization Files (i18n)

### 26. **src/locales/en.json** 
**Update all text references to Paul and his projects:**
- **Line 32**: `"webdev": "Web developer"` → Update to your title if different
- **Lines 44-46**: Welcome message mentions "my computer" and "my username"
- **Lines 114-260**: All project descriptions (Logma, Pangaia, Clench, EMC2, Aidella, Fanny, Homeserver)
- **Lines 158-174**: "Legal notices" section mentions Paul Jaguin's personal address
  - Address: `"202 Boulevard de Charonne, 75020 PARIS"`
  - Birth date: `"09/23/1999"`
  - URL: `"https://pauljaguin.com"`

### 27. **src/locales/fr.json**
**Update all French text references:**
- **Line 32**: `"webdev": "Développeur web"` → Update to your title
- **Lines 44-46**: Welcome messages
- **Lines 114-256**: All project descriptions (French versions)
- **Lines 154-170**: "Mentions légales" section with Paul's personal information
  - Same address and personal details as English version

---

## 🖼️ Image Assets to Replace

### 28. **Profile & Identity Images**
Located in `/public/img/`:
- `profile-picture.webp` → Your profile picture
- `logo-portfolio-white.webp` → Your logo (white version)
- `logo-portfolio-black.webp` → Your logo (black version)
- `office-picture.webp` → Desktop background (if you want to customize)

### 29. **CV Photo**
- `/public/img/icons/cv/paul-jaguin-photo-cv.webp` → Your CV photo

### 30. **Personal Photos**
Located in `/public/img/icons/pictures/carroussel/`:
- `colette.webp`
- `paris.webp`
- `rennes.webp`
- `lorient.webp`
- `berlin.webp`
- `gdansk.webp`
- `poznan.webp`
- `warszawa.webp`

### 31. **Project Images**
Located in `/public/img/projects/`:
- **aidella/** folder
- **pangaia/** folder
- And other project-specific images

Replace these with screenshots/images from your own projects.

---

## 📄 PDF Files to Replace

### 32. **CV PDFs**
Located in `/public/pdf/`:
- `CV_paul_jaguin_en.pdf` → Your English CV
- `CV_paul_jaguin_fr.pdf` → Your French CV

---

## 🔗 Social Links & External References

### 33. **src/data/left-menu-data.json**
- **Line 105**: GitHub link: `"url": "https://github.com/UnMugViolet"` → Change to your GitHub profile

---

## ⚠️ Additional Considerations

### Environment Variables
Check if there are any `.env` or `.env.example` files that might contain:
- EmailJS configuration (`VITE_APP_EMAILJS_*` variables referenced in Jenkinsfile lines 57-59)
- Admin email and name (`VITE_APP_ADMIN_*` variables)
- Domain name configuration

### Calendar Files
Located in `/public/calendar/`:
- `calendar-en.ics`
- `calendar-fr.ics`

These contain personal calendar data and should be replaced or removed.

### Music Files
Located in `/public/musics/`:
- These are likely personal music files for the music player feature
- Replace with your own or remove the music player feature entirely

---

## 🎮 Your Games Integration

You mentioned wanting to add **Doom and Minesweeper** games:

### Already Present:
- **Doom**: Appears to be in `/public/game/` directory (js-dos integration)
- **Minesweeper**: Component exists in the codebase

### To Showcase Them:
1. Add entries in **src/data/projects-data.json** for both games
2. Create project content components if not already present:
   - `src/components/Windows/MyProjects/DoomContent.vue`
   - `src/components/Windows/MyProjects/MinesweeperContent.vue`
3. Add project descriptions in **src/locales/en.json** and **src/locales/fr.json**
4. Add project images in `/public/img/projects/`

---

## 📋 Summary Checklist

- [x] Update package.json with your info
- [x] Update index.html meta tags
- [x] Update README.md
- [x] Update LICENSE with your name
- [x] Replace all router meta tags
- [x] Update or remove analytics (Matomo) - Commented out
- [ ] Update or remove CI/CD files (Jenkinsfile, sonar-project.properties)
- [x] Update sitemap.xml
- [ ] **Replace entire cv-data.json with your resume**
- [ ] **Replace entire projects-data.json with your projects**
- [ ] Update playlist-data.json or remove music feature
- [ ] Replace pictures-data.json with your photos
- [x] Update all Vue components with your name
- [x] Update localization files (en.json with gamedev, he.json created)
- [x] Replace logo images (logo-portfolio-black.webp & logo-portfolio-white.webp)
- [x] Replace profile picture (profile-picture.webp)
- [x] Replace CV photo placeholder (yoni-sabag-photo-cv.webp)
- [ ] Replace CV PDFs (need CV_yoni_sabag_en.pdf & CV_yoni_sabag_he.pdf)
- [ ] Update all GitHub/social links
- [ ] Replace calendar files
- [ ] Replace/remove personal music files
- [ ] Add your Doom and Minesweeper games to projects
- [ ] Update environment variables
- [ ] Test contact form with your email
- [x] **EXTRA: Changed language from French to Hebrew (EN/HE)**
- [x] **EXTRA: Changed default language to English**
- [x] **EXTRA: Created Hebrew locale file (he.json)**

---

## 🚀 Quick Start

1. Start with the **CRITICAL** section files first
2. Replace all personal data in JSON files
3. Replace images and PDFs
4. Update localization strings
5. Test all links and forms
6. Remove or update any references to Paul's infrastructure (Jenkins, SonarQube, servers)

Good luck with your portfolio! 🎉
