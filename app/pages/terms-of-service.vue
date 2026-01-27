<template>
    <div class="max-w-4xl mx-auto my-12 text-lg leading-relaxed text-label-primary p-6">
        <h1 class="text-4xl font-bold mb-8 text-accent-primary">Terms and Conditions</h1>

        <p class="mb-8 text-xl text-label-secondary">
            By using this project, you agree to the following terms and conditions.
        </p>

        <section class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-accent-primary">Usage</h2>
            <p class="mb-4">
                This project is open-source and provided as-is. You are free to use, modify, redistribute, and integrate
                it into any of your projects or solutions without restrictions.
            </p>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-accent-primary">Disclaimer</h2>
            <p class="mb-4">
                The project is provided without any warranty of any kind, express or implied, including but not limited
                to the warranties of merchantability, fitness for a particular purpose, or non-infringement. We are not
                responsible for any issues or damages arising from the use of this project.
            </p>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-bold mb-4 text-accent-primary">Acknowledgment</h2>
            <p class="mb-4">
                By using this project, you acknowledge that it is intended to help you start your SaaS project and does
                not impose any limitations or restrictions on its usage.
            </p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
    layout: 'doc',
})
</script>
