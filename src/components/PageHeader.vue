<template>
  <h1>
    <span class="addon" v-if="hasPrefix()">
      <slot name="prefix"></slot>
    </span>
    {{ label }}
  </h1>
</template>

<script setup>
import { useSlots } from 'vue'
const slots = useSlots()

const hasPrefix = () => {
  return !!slots.prefix
}

defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
h1 {
  font-size: 2.2em;
  display: block;
  margin-bottom: 1.5em;
}
.addon {
  margin-right: 0.5em;
}
</style>
