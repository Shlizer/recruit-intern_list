<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'

window.addEventListener('unhandledrejection', event => {
  toast.error(event.reason)
})
</script>
