<script setup lang="ts">
import Card from "@/components/Card.vue";
import CardButton from "@/components/CardButton.vue";
import {useItemStore} from "@/stores/itemStore";
import {useMoneyStore} from "@/stores/money";
import {computed, ref} from "vue";

const props = defineProps<{
  name: string,
  src: string,
  price: number,
  description: string,
}>();

const store = useItemStore();
const money = useMoneyStore();

const amount = ref(1);

const item = store.GetItem(props.name);

const operation = computed(() => store.GetOperation(props.name, amount.value));
const available = computed(() => {
  const p = operation.value.price;
  return money.money >= (p > 0 ? p : store.GetOperation(props.name, 1).price);
});
const price = computed(() => operation.value.price > 0 ? operation.value.price : store.GetOperation(props.name, 1).price);
</script>

<template>
  <Card class="overflow-hidden h-50 flex gap-5">
    <Card class="overflow-hidden h-full rounded-tr-none rounded-br-none border-none">
      <img :src="src" class="w-full h-full object-cover border-r border-gray-700"/>
    </Card>
    <div class="flex flex-col mr-2 gap-2">
      <div>
        <p>{{ name }}: {{ store.bought[props.name] || 0 }}</p>
        <p class="w-50 text-neutral-500">{{ item.sign }}{{ money.Round(operation.amount * item.modifier * (item.sign === '+' ? (store.bought['Mr.Penis'] || 1) : 1)) }}$
          {{ description }}</p>
      </div>
      <div class="flex gap-1">
        <div class="grid grid-cols-2 gap-1">
          <CardButton
              v-for="i in [1, 5, 10]"
              :key="i"
              :class="['p-2 w-11 h-11', {'bg-black text-white hover:!bg-black':amount == i}]"
              @click="amount = i">{{ i }}
          </CardButton>
          <CardButton
              :class="['p-2 w-11 h-11 text-xs', {'bg-black text-white hover:!bg-black':amount == Infinity}]"
              @click="amount = Infinity">
            <p>MAX</p>
            <p>{{ store.GetOperation(props.name, Infinity).amount }}</p>
          </CardButton>
        </div>
        <CardButton class="p-2" @click="() => store.Buy(props.name, amount)">
          <p>Купить</p>
          <p :class="{'text-red-500':!available}">{{ price }}$</p>
        </CardButton>
      </div>
    </div>
  </Card>
</template>