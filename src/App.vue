<script setup>
import ClickButton from "@/components/ClickButton.vue";
import {useMoneyStore} from "@/stores/money.js";
import Card from "@/components/Card.vue";
import Store from "@/components/Store.vue";
import CardButton from "@/components/CardButton.vue";
import {ref} from "vue";
import {useGameStore} from "@/stores/game.js";
import Dialog from "@/components/Dialog.vue";
import End from "@/components/End.vue";
import Time from "@/components/Time.vue";

const money = useMoneyStore();
const game = useGameStore();

const dialog = ref(null);
</script>

<template>
  <main class="relative w-full h-screen flex items-center justify-center gap-10">
    <!-- button and other -->
    <div class="flex flex-col items-center justify-center gap-10">
      <div class="flex items-center justify-between gap-5">
        <Card class="p-2 flex flex-col">
          <Time :time="game.time"/>
          <Time :time="game.deadline"/>
        </Card>
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-xl">Долг перед картелем</h2>
          <h1 class="text-3xl text-red-500">{{ money.debt }}$</h1>
        </div>
        <CardButton class="p-2" @click="money.PayDebt">Оплатить</CardButton>
      </div>
      <ClickButton/>
      <h1 class="text-3xl text-green-600">{{ money.money }}$</h1>
    </div>
    <!-- store -->
    <Store/>

    <!--  dialogs  -->
    <Dialog :open="true" :addbutton="true">
      <div class="w-70 flex flex-col gap-5">
        <h1 class="text-xl">Ты задолжал картелю 1 песо неделю назад и теперь долг вырос до <span class="text-red-500">миллиона долларов</span></h1>
        <h1 class="text-2xl">Сейчас <Time :time="game.time"/><br>Картель прибудет в <Time :time="game.deadline"/></h1>
      </div>
    </Dialog>
    <End/>
  </main>
</template>