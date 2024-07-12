<template>
    <div class="border border-base-300 p-4 rounded-lg shadow-sm">
        <div class="flex justify-center form-control mb-4">
            <select name="state" id="state" class="select select-bordered" v-model="state" @change="reset">
                <option selected value="working">Working</option>
                <option value="break">Break</option>
                <option value="long-break">Long Break</option>
            </select>
        </div>
        <h1 class="text-5xl font-bold flex justify-center">{{ time }}</h1>
        <div class="w-full min-w-full mt-4 grid md:grid-cols-4 grid-cols-1 md:gap-2">
            <button class="btn btn-primary w-full min-w-full col-span-3" @click="toggle">
                <span v-if="!isRunning">Start</span>
                <span v-else>Stop</span>
            </button>
            <button class="btn btn-neutral col-span-1 w-full min-w-full mt-2 md:mt-0" @click="reset">Reset</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ConvertSecondToFotmatedString } from '../lib/convert';

const time = ref("25:00")
const isRunning = ref(false)

const secondsIn25Min = 25 * 60
const secondsIn5Min = 5 * 60
const secondsIn15Min = 15 * 60
const msInSecond = 1000

let interval: null|number = null
let timePasted = 0
let timesWorked = 0
let state: "working"|"break"|"long-break" = "working"
let currentTime = 0
let wasStopped = false

function switchState() {
    switch (state) {
        case "working":
            currentTime = secondsIn25Min
            break
        case "break":
            currentTime = secondsIn5Min
            break
        case "long-break":
            currentTime = secondsIn15Min
            break
    }
}

function start() {
    isRunning.value = true
    if (!wasStopped) {
        timePasted = 0
        switchState()
        wasStopped = false
    }
    interval = setInterval(() => {
        timePasted++
        time.value = ConvertSecondToFotmatedString(currentTime - timePasted)
        if (timePasted === currentTime) {
            if (state === "break" || state === "long-break") {
                state = "working"
            } else if (state === "working") {
                state = "break"
                timesWorked++
            }
            if (timesWorked === 4) {
                state = "long-break"
                timesWorked = 0
            }
            reset()
        }
    }, msInSecond)
}

function stop() {
    isRunning.value = false
    clearInterval(interval as number)
    wasStopped = true
}

function toggle() {
    if (isRunning.value) {
        stop()
        return
    }

    start()
}

function reset() {
    isRunning.value = false
    clearInterval(interval as number)
    timePasted = 0
    switchState()
    time.value = ConvertSecondToFotmatedString(currentTime - timePasted)
    wasStopped = false
}

</script>
