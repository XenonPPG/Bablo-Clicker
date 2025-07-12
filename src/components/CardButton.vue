<script setup lang="ts">

import Card from "@/components/Card.vue";
</script>

<template>
  <Card class="hover:bg-neutral-200 transition-colors duration-200 hover:cursor-pointer">
    <button class="w-full h-full hover:cursor-pointer">
      <slot></slot>
    </button>
  </Card>
</template>
