import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    imports: {
        autoImport: false,
    },
    pages: true,
    runtimeConfig: {
        mongoUri: 'mongodb://localhost:27017/nu31space',
        jwtSecret: 'test-jwt-secret',
        public: {
            baseUrl: 'http://localhost:3000',
            gitCommitSha: 'local',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    css: ['~/assets/css/main.css'],
})
