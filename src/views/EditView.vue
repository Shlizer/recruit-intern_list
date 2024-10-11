<template>
  <PageHeader label="Edit user">
    <template v-slot:prefix>
      <FontAwesomeIcon class="icon" @click="goBack()" :icon="faArrowLeft" />
    </template>
  </PageHeader>
  <BoxContainer />
</template>

<script setup>
import { useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import BoxContainer from '@/components/BoxContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()

const goBack = () => router.back()

defineProps({
  id: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.icon {
  color: var(--icons-color);
  width: 0.5em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--icons-color-hover);
  }
}
</style>
