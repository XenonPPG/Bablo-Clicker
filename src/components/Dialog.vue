<script setup>
import Card from "@/components/Card.vue";
import {ref, watch} from "vue";

const props = defineProps({
  open: Boolean,
  addbutton: Boolean
});
const open = ref(props.open);
const emit = defineEmits(["close"]);

function Close(){
  open.value = false;
  emit("close");
}

defineExpose({open})
watch(() => props.open, () => open.value = props.open)
</script>

<template>
  <div v-if="open"
       class="absolute w-full h-full backdrop-blur-xs bg-black/50 flex items-center justify-center">
    <Card class="bg-white p-10 flex flex-col gap-5">
      <slot></slot>
      <button v-if="props.addbutton" class="border-1 border-black rounded-md p-2 mt-5 hover:bg-neutral-200 hover:cursor-pointer transition-colors" @click="Close">Закрыть</button>
    </Card>
  </div>
</template>