<template>
    <div class="min-h-screen bg-background-primary text-label-primary font-sans">

        <div class="relative w-full py-20">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-5xl md:tex-7xl font-bold mb-6 text-accent-primary">
                    VeloNuxt
                </h1>
                <h2 class="text-3xl md:text-4xl font-bold mb-8 text-label-primary">
                    make your next project in weekends
                </h2>
                <p class="text-xl text-label-secondary mb-12 max-w-3xl mx-auto">
                    Push keep it stupid simple to the maximum. Explore the true power of copy paste.
                </p>
                <div class="flex justify-center gap-4">
                    <MainButton button-style="primary" size="L" label="GitHub" icon="mdi:github"
                        link="https://github.com/VovaStelmashchuk/kickstart" />
                    <MainButton button-style="secondary" size="L" label="Login with Google" icon="mdi:google"
                        @click="startGoogleAuth" />
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 py-16 space-y-24">
            <!-- Design Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Design
                </h2>
                <p class="text-xl mb-8 text-label-secondary">Less color better. Black and white always in trend</p>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary">
                        <h3 class="text-2xl font-bold mb-4">Simple css setup</h3>
                        <p class="text-label-secondary">
                            I prepare main.css with main color and few common styles like styles for text styles, border
                            and grid
                        </p>
                    </div>
                    <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary">
                        <h3 class="text-2xl font-bold mb-4">Components</h3>
                        <p class="text-label-secondary">
                            You don't need any bootstrap or other ui libraries. One component for button and one for
                            input it's all you need
                        </p>
                    </div>
                </div>
            </section>

            <!-- Codebase Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Keep codebase as small as posible
                </h2>
                <p class="text-xl mb-8 text-label-secondary">
                    One repository it's all you need. Use metaframework like Nuxt store all client and backend code into
                    one repository
                </p>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary">
                        <h3 class="text-2xl font-bold mb-4">Make change quickly</h3>
                        <p class="text-label-secondary">
                            Nuxt allow you to use hot-reload, which apply both change from client and backend
                            immediately
                        </p>
                    </div>
                    <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary">
                        <h3 class="text-2xl font-bold mb-4">One application for both</h3>
                        <p class="text-label-secondary">
                            Nuxt allow you to ship your product with client and backend as single application
                        </p>
                    </div>
                </div>
            </section>

            <!-- Deployment Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Implement own deployment it's not that hard
                </h2>
                <p class="text-xl mb-8 text-label-secondary">
                    Modern industry try to convince you that deployment is hard, but it's actualy not
                </p>

                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-fill-secondary p-6 rounded-xl border border-separator-primary">
                        <h3 class="text-xl font-bold mb-3">DockerFile</h3>
                        <p class="text-sm text-label-secondary">
                            The project provide you with DockerFile, which fully prepared to run Nuxt application in
                            production
                        </p>
                    </div>
                    <div class="bg-fill-secondary p-6 rounded-xl border border-separator-primary">
                        <h3 class="text-xl font-bold mb-3">docker-stack.yml</h3>
                        <p class="text-sm text-label-secondary">
                            This file defines the services, networks, and volumes for deploying your application using
                            Docker Stack.
                        </p>
                    </div>
                    <div class="bg-fill-secondary p-6 rounded-xl border border-separator-primary">
                        <h3 class="text-xl font-bold mb-3">.github/workflow</h3>
                        <p class="text-sm text-label-secondary">
                            Automates deployment using GitHub Actions. Builds Docker image, pushes to registry, and
                            deploys to VPS via SSH.
                        </p>
                    </div>
                    <div class="bg-fill-secondary p-6 rounded-xl border border-separator-primary">
                        <h3 class="text-xl font-bold mb-3">KISS</h3>
                        <p class="text-sm text-label-secondary">
                            You don't need Vercel or AWS. Use docker and deploy to any VPS. Blue-green deployment and
                            secrets management included.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Features to copy paste
                </h2>
                <div class="space-y-6">
                    <div class="bg-fill-tertiary p-6 rounded-xl border border-separator-secondary">
                        <h3 class="text-2xl font-bold mb-2">Social Auth (Google & GitHub)</h3>
                        <p class="text-label-secondary">
                            Seamless authentication on multiple devices. No extra setup needed. Just few http calls.
                        </p>
                    </div>
                    <div class="bg-fill-tertiary p-6 rounded-xl border border-separator-secondary">
                        <h3 class="text-2xl font-bold mb-2">Admin Auth</h3>
                        <p class="text-label-secondary">
                            Just login with your social account and add field isAdmin to your user record into database.
                        </p>
                    </div>
                    <div class="bg-fill-tertiary p-6 rounded-xl border border-separator-secondary">
                        <h3 class="text-2xl font-bold mb-2">Pre-built Landing Page</h3>
                        <p class="text-label-secondary">
                            A clean and modern landing page structure is included by default.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Get Started Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Get Started
                </h2>
                <div class="bg-fill-secondary p-8 rounded-xl border border-separator-primary overflow-x-auto">
                    <pre class="whitespace-pre-wrap font-mono text-sm text-label-secondary">
# 1. Clone the Repository
git clone https://github.com/VovaStelmashchuk/kickstart

# 2. Create a .secret.json file
# Store your sensitive data (Mongo URL, OAuth keys, etc.)

# 3. Install Dependencies
npm install

# 4. Start the Development Server
npm run dev
# Your app will be running at http://localhost:3000
                    </pre>
                </div>
            </section>

            <!-- Deployment Section 2 -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Deploy to Any VPS
                </h2>
                <p class="text-xl mb-6 text-label-secondary">
                    We personally use <a href="https://hetzner.cloud/?ref=z9gjQzbiO5y9"
                        class="underline hover:text-accent-primary">Hetzner</a> (hosting multiple projects on a single
                    VPS).
                </p>
                <div class="bg-fill-secondary p-6 rounded-xl border border-separator-primary">
                    <h3 class="text-lg font-bold mb-4">Some Projects Hosted on the Same Server:</h3>
                    <ul class="list-disc list-inside space-y-2 text-label-secondary">
                        <li><a href="https://mixdrinks.org"
                                class="hover:text-accent-primary underline">mixdrinks.org</a></li>
                        <li><a href="https://androidstory.dev"
                                class="hover:text-accent-primary underline">androidstory.dev</a></li>
                        <li><a href="https://podcast.stelmashchuk.dev"
                                class="hover:text-accent-primary underline">podcast.stelmashchuk.dev</a></li>
                        <li><a href="https://nest2d.stelmashchuk.dev"
                                class="hover:text-accent-primary underline">nest2d.stelmashchuk.dev</a></li>
                    </ul>
                </div>
            </section>

            <!-- FAQ Section -->
            <section>
                <h2 class="text-4xl font-bold mb-8 text-accent-primary border-b border-separator-primary pb-4">
                    Frequently Asked Questions
                </h2>
                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-bold mb-2">Is it open source?</h3>
                        <p class="text-label-secondary">Yes, it's completely open-source. Feel free to use and modify!
                        </p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">What is the stack?</h3>
                        <p class="text-label-secondary">Nuxt 3 (Vue), Tailwind CSS, MongoDB integration, Docker, and
                            GitHub Actions for CI/CD.</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">Can I contribute?</h3>
                        <p class="text-label-secondary">Absolutely! Check out our <a
                                href="https://github.com/VovaStelmashchuk/kickstart"
                                class="underline hover:text-accent-primary">GitHub repository</a>.</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { onMounted } from 'vue'
import { trackEvent } from '~~/layers/03-analytics/app/utils/track'

definePageMeta({
    layout: 'void',
})

onMounted(async () => {
    trackEvent('page_view', { page: 'landing' })
})

const startGoogleAuth = async () => {
    try {
        const response = await $fetch<{ url: string }>('/api/auth/google/redirect')
        if (response.url) {
            window.location.href = response.url
        }
    } catch (e) {
        console.error('Failed to start Google Auth', e)
    }
}
</script>
