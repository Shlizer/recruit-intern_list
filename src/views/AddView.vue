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
import { toast } from 'vue3-toastify'
import { AddUser } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import UsersForm from '@/components/UsersForm.vue'

/**
 * REFS
 */
const submitting = ref(false)

/**
 * METHODS
 */
const router = useRouter()

const goBack = () => router.back()

const onSubmit = async data => {
  submitting.value = true
  let toFill = []

  if (!data.first_name) toFill.push('first name')
  if (!data.last_name) toFill.push('last name')
  if (!data.avatar) toFill.push('avatar')

  if (toFill.length) {
    toast.error(`Fields that need to be filled: ${toFill.join(', ')}`)
    submitting.value = false
    return false
  }

  await AddUser(data)
  submitting.value = false
  router.push('/').then(() => toast.success('User created.'))
}
</script>
