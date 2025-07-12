<script setup>
import Card from "@/components/Card.vue";
import {useGameStore} from "@/stores/game";
import { useMoneyStore } from "@/stores/money";
import lose from '@/assets/img/lose.jpg';
import win from '@/assets/img/win.jpg';
import Dialog from "@/components/Dialog.vue";
import Time from "@/components/Time.vue";
import {ref, watch} from "vue";

const game = useGameStore();
const money = useMoneyStore();

const open = ref(false);

watch(() => game.outcome, Open);

function Open(){
  open.value = true;
  console.log('game ended');
}

function Reload(){
  window.location.reload();
}
</script>

<template>
  <Dialog :open="open">
    <h1 :class="['text-5xl', {'text-green-600':game.outcome.win, 'text-red-500':!game.outcome.win}]">
      {{ game.outcome.messages.title }}</h1>
    <h2 class="text-3xl">{{ game.outcome.messages.subtitle }}</h2>
    <p class="text-2xl">Всего заработано денег: <span class="text-green-600">{{ money.totalMoney }}$</span></p>
    <template v-if="game.outcome.win">
      <div class="flex text-2xl gap-1">Игра пройдена за <Time :time="game.time - game.start"/></div>
      <Card class="aspect-square w-70 h-70 !p-0 select-none overflow-hidden">
        <img :src="win" class="w-full h-full"/>
      </Card>
    </template>
    <template v-else>
      <p class="text-2xl">Не хватило: <span
          class="text-red-500">{{ money.Round((money.debt - money.money)) }}$</span></p>
      <Card class="aspect-square w-70 h-70 !p-0 select-none overflow-hidden">
        <img :src="lose" class="w-full h-full"/>
      </Card>
    </template>
    <button class="border-1 border-black rounded-md p-2 mt-5 hover:bg-neutral-200 hover:cursor-pointer transition-colors" @click="Reload">Сыграть снова</button>
  </Dialog>
</template>