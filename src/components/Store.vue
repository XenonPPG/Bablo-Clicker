<script setup lang="ts">
import Card from "@/components/Card.vue";
import Yan from "@/assets/img/yan.jfif";
import Skebob from "@/assets/img/skebob.jfif";
import StoreItem from "@/components/StoreItem.vue";
import {useItemStore} from "@/stores/itemStore";
import {useMoneyStore} from "@/stores/money";
import {computed, watch} from "vue";

const money = useMoneyStore();
const store = useItemStore();

//#region Yan Autoclicker
const yanAmount = computed(() => store.bought['Йоп Ян'] || 0);
let autoclick;
const yanModifier = store.GetItem('Йоп Ян').modifier * 100;
const timeout = 1000 / yanModifier;
watch(yanAmount, (n, old) => {
  clearInterval(autoclick);
  if (n > 0) {
    autoclick = setInterval(doClick, n > 0 ? timeout / n : timeout);
  }
});

function doClick() {
  let extra = Math.max(yanAmount.value - timeout, 0) / timeout || 1;
  money.AddMoney(store.GetItem('Йоп Ян').modifier / yanModifier * extra)
}
//#endregion
</script>

<template>
  <Card class="p-2 flex flex-col gap-2">
    <h1 class="text-xl">Магазин</h1>
    <div class="flex flex-col gap-2">
      <StoreItem v-for="item in store.items" :key="item.name" :name="item.name" :src="item.src" :price="item.price"
                 :description="item.description"/>
    </div>
  </Card>
</template>