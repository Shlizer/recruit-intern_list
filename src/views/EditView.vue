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

  <BoxContainer v-if="loading">
    <LoadingContent />
  </BoxContainer>
  <BoxContainer v-if="error">
    <ErrorAlert>{{ error }}</ErrorAlert>
  </BoxContainer>

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
import { toast } from 'vue3-toastify'
import { GetUser, UpdateUser } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingContent from '@/components/LoadingContent.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import UsersForm from '@/components/UsersForm.vue'
import BoxContainer from '@/components/BoxContainer.vue'

/**
 * PROPS
 */
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

/**
 * REFS
 */
const loading = ref(false)
const submitting = ref(false)
const user = ref(null)
const error = ref(null)

/**
 * METHODS
 */
const router = useRouter()

const goBack = () => router.back()

const onSubmit = async data => {
  submitting.value = true
  await UpdateUser(user.value.data.id, data)
  submitting.value = false
  toast.success('User updated.')
  return true
}

const fetchData = async id => {
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

/**
 * UTILS
 */
watch(() => props.id, fetchData, { immediate: true })
</script>

<style scoped></style>
