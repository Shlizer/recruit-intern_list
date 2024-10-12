<template>
  <PageHeader label="Edit user">
    <template v-slot:prefix>
      <FontAwesomeIcon
        class="icon small interactable"
        @click="goBack()"
        :icon="faArrowLeft"
      />
    </template>
  </PageHeader>

  <LoadingContent v-if="loading" />
  <ErrorAlert v-if="error">{{ error }}</ErrorAlert>

  <UsersForm
    v-if="user"
    :user="user.data"
    submit-label="Update Details"
    :submit-disabled="submitting"
    :submit-callback="onSubmit"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { GetUser, UpdateUser } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingContent from '@/components/LoadingContent.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import UsersForm from '@/components/UsersForm.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const loading = ref(false)
const submitting = ref(false)
const user = ref(null)
const error = ref(null)

watch(() => props.id, fetchData, { immediate: true })

const router = useRouter()
const goBack = () => router.back()

const onSubmit = async data => {
  submitting.value = true
  await UpdateUser(user.value.data.id, data)
  submitting.value = false
  return true
}

async function fetchData(id) {
  error.value = user.value = null
  loading.value = true

  try {
    user.value = await GetUser(id)
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
