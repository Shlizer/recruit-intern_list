<template>
  <PageHeader label="Add user">
    <template v-slot:prefix>
      <FontAwesomeIcon
        class="icon small interactable"
        @click="goBack()"
        :icon="faArrowLeft"
      />
    </template>
  </PageHeader>

  <UsersForm
    submit-label="Add User"
    :submit-disabled="submitting"
    :submit-callback="onSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AddUser } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import UsersForm from '@/components/UsersForm.vue'

const submitting = ref(false)

const router = useRouter()
const goBack = () => router.back()

const onSubmit = async data => {
  submitting.value = true
  if (!data.first_name || !data.last_name || !data.avatar) {
    console.error('NO DATA')
    submitting.value = false
    return false
  }
  await AddUser(data)
  submitting.value = false
  return true
}
</script>
