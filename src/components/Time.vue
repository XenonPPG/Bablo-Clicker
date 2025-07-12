<script setup>
import {useGameStore} from "@/stores/game.js";

const props = defineProps({
  time: Number
})

const game = useGameStore();
</script>

<template>
<p>{{game.GetTime(time).hours}}:{{game.GetTime(time).minutes}}</p>
</template>