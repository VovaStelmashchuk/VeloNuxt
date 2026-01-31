<template>
    <div class="bg-background-primary overflow-x-hidden max-w-full min-h-screen flex flex-col">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <NuxtLink to="/" class="text-3xl font-bold text-accent-primary hover:opacity-80 transition-opacity">
                    VeloNuxt
                </NuxtLink>
            </div>
        </div>
        <slot class="min-h-screen" />
        <Footer />
    </div>
</template>

<script setup lang="ts"></script>
