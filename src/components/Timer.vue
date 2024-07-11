<template>
    <div class="border border-base-300 p-4 rounded-lg shadow-sm">
        <h1 class="text-5xl font-bold flex justify-center">{{ time }}</h1>
        <div class="w-full min-w-full mt-4 grid md:grid-cols-4 grid-cols-1 md:gap-2">
            <button class="btn btn-primary w-full min-w-full col-span-3">
                <span v-if="!isRunning">Start</span>
                <span v-else>Stop</span>
            </button>
            <button class="btn btn-neutral col-span-1 w-full min-w-full mt-2 md:mt-0">Reset</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const time = ref("25:00")
const isRunning = ref(false)

</script>
