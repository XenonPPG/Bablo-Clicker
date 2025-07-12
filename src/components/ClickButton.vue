<script setup lang="ts">
import {ref} from "vue";
import Card from "@/components/Card.vue";
import active from "@/assets/img/active.jpg";
import normal from "@/assets/img/normal.jpg";
import {useMoneyStore} from "@/stores/money";
import { useItemStore } from "@/stores/itemStore";

const src = ref(normal);
const money = useMoneyStore();
const store = useItemStore();

function onClick(isClicked: boolean) {
  src.value = isClicked ? active : normal;
  if (isClicked) {
    money.AddMoney(money.moneyDelta * ((store.bought['Скебоб'] + 1) || 1));
  }
}
</script>

<template>
  <Card class="aspect-square w-70 h-70 !p-0 select-none overflow-hidden">
    <button class="w-full h-full p-0 border-none bg-transparent">
      <img
          :src="src"
          class="w-full h-full object-cover"
          @mousedown="() => onClick(true)"
          @mouseup="() => onClick(false)"
      />
    </button>
  </Card>
</template>