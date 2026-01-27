<template>
    <footer class="border-t border-separator-primary mt-auto">
        <div class="container mx-auto px-4 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div class="text-sm text-label-secondary">
                    © {{ currentYear }} Vova Stelmashchuk. All rights reserved. Built with ♥ and open source principles.
                </div>
                <div class="flex space-x-6">
                    <NuxtLink to="/terms-of-service"
                        class="text-sm text-label-secondary hover:text-accent-primary transition-colors">
                        Terms of Service
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
