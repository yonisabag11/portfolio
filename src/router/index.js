import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loader,
      meta: {
        title: 'Portfolio | Yoni Sabag - Game Developer / Web Developer',
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://yonisabag.github.io/portfolio'
          },
          {
            name: 'title',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'description',
            content:
              "Discover the portfolio of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            name: 'keywords',
            content: 'portfolio, yoni sabag, game developer, web developer, maze escape, discrete math, games, web applications, itch.io'
          },
          {
            name: 'author',
            content: 'Yoni Sabag'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'application-name',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'twitter:description',
            content:
              "Discover the portfolio of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            name: 'twitter:image',
            content: 'https://yonisabag.github.io/portfolio/img/logo-portfolio-white.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Logo Portfolio Yoni Sabag'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            property: 'og:description',
            content:
              "Discover the portfolio of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            property: 'og:site_name',
            content: 'Portfolio | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            property: 'og:url',
            content: 'https://yonisabag.github.io/portfolio'
          },
          {
            property: 'og:image',
            content: 'https://yonisabag.github.io/portfolio/img/logo-portfolio-white.webp'
          },
          {
            property: 'og:image:alt',
            content: 'Logo Portfolio Yoni Sabag'
          },
          {
            property: 'og:locale',
            content: 'en_US'
          },
          {
            property: 'og:locale:alternate',
            content: 'he_IL'
          }
        ]
      }
    },
    {
      path: '/office',
      name: 'Office',
      component: Office,
      meta: {
        title: 'Office | Yoni Sabag - Game Developer / Web Developer',
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://yonisabag.github.io/portfolio/office'
          },
          {
            name: 'title',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'description',
            content:
              "Discover the office of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            name: 'keywords',
            content: 'office, yoni sabag, game developer, web developer, maze escape, discrete math, games, web applications, itch.io'
          },
          {
            name: 'author',
            content: 'Yoni Sabag'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'application-name',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'twitter:description',
            content:
              "Discover the office of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            name: 'twitter:image',
            content: 'https://yonisabag.github.io/portfolio/img/logo-portfolio-white.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Logo Portfolio Yoni Sabag'
          },
          {
            name: 'og:type',
            content: 'website'
          },
          {
            name: 'og:title',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'og:description',
            content:
              "Discover the office of Yoni Sabag, passionate game developer and web developer. Creator of games like Maze Escape and Discrete Math Escape Room, and web applications."
          },
          {
            name: 'og:site_name',
            content: 'Office | Yoni Sabag - Game Developer / Web Developer'
          },
          {
            name: 'og:url',
            content: 'https://yonisabag.github.io/portfolio/office'
          },
          {
            name: 'og:image',
            content: 'https://yonisabag.github.io/portfolio/img/logo-portfolio-white.webp'
          },
          {
            name: 'og:image:alt',
            content: 'Logo Portfolio Yoni Sabag'
          },
          {
            name: 'og:locale',
            content: 'en_US'
          },
          {
            name: 'og:locale:alternate',
            content: 'he_IL'
          }
        ]
      }
    }
  ]
})

export default router
