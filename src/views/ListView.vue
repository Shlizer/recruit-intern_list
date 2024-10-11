<template>
  <PageHeader label="User list"></PageHeader>
  <BoxContainer>
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="users" class="content">
      <UsersTable :users="users.data" />
    </div>
    <div v-else class="content"></div>
  </BoxContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { GetUsers } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import BoxContainer from '@/components/BoxContainer.vue'
import UsersTable from '@/components/UsersTable.vue'

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})

const loading = ref(false)
const users = ref(null)
const error = ref(null)

watch(() => props.page, fetchData, { immediate: true })

async function fetchData(page) {
  error.value = users.value = null
  loading.value = true

  try {
    users.value = await GetUsers(page)
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>
