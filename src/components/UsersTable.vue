<template>
  <div class="table">
    <div class="table-row">
      <div class="table-col table-header"></div>
      <div class="table-col table-header">Full Name</div>
      <div class="table-col table-header">Action</div>
    </div>
    <div class="table-row" v-for="user in users" :key="user.id">
      <div class="table-col"><img :src="user.avatar" class="avatar" /></div>
      <div class="table-col">{{ user.first_name }} {{ user.last_name }}</div>
      <div class="table-col">
        <FontAwesomeIcon
          @click="onEditUser(user.id)"
          class="icon interactable"
          :icon="faPenToSquare"
        />
        <FontAwesomeIcon
          @click="onDeleteUser(user.id)"
          class="icon interactable"
          :icon="faTrash"
        />
      </div>
    </div>
  </div>

  <ConfirmModal
    :show="deleteId > 0"
    title="Delete user"
    content="Are you sure you want to delete this user?"
    @confirm="onDeleteUserConfirm"
    @cancel="() => (deleteId = 0)"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { DeleteUser } from '@/api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from './ConfirmModal.vue'

/**
 * PROPS
 */
const props = defineProps({
  users: {
    type: Array[Object],
    required: true,
  },
  onReload: {
    type: Function,
    required: true,
  },
})

/**
 * REFS
 */
const deleteId = ref(0)

/**
 * METHODS
 */
const router = useRouter()

const onEditUser = id => router.push(`/edit/${id}`)
const onDeleteUser = id => (deleteId.value = id)
const onDeleteUserConfirm = async () => {
  await DeleteUser(deleteId.value)
  deleteId.value = 0
  toast.success('User deleted')
  props.onReload()
}
</script>

<style scoped>
.table {
  width: 100%;
  display: table;
}
.table-body {
  display: table-row-group;
}
.table-row {
  display: table-row;

  &:nth-child(odd) {
    background-color: var(--table-background-odd);
  }
  &:nth-child(even) {
    background-color: var(--table-background-even);
  }
}
.table-col {
  display: table-cell;
  border: 0;
  padding: 1em;
  vertical-align: middle;

  &:first-of-type {
    padding: 0.5em 1em;
    width: var(--table-avatar-size);
    padding-right: 3em;
  }
  &:last-of-type {
    width: var(--table-action-size);
  }
}
.table-header {
  font-weight: bold;
}
.avatar {
  width: var(--table-avatar-size);
}
.icon {
  margin-right: 1em;
}
</style>
