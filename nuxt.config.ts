import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    extends: ['./layers/00-service', './layers/01-design-system', './layers/10-user', './layers/11-analytics', './layers/12-gallery', './layers/13-blog'],
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    imports: {
        autoImport: false,
    },
    pages: true,
    runtimeConfig: {
        mongoUri: 'mongodb://localhost:27017/velonuxt',
        jwtSecret: 'test-jwt-secret',
        public: {
            baseUrl: 'http://localhost:3000',
            gitCommitSha: 'local',
            googleClientId: '',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    css: ['~/assets/css/main.css'],
})
