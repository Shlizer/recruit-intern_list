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
</template>

<script setup>
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

defineProps({
  users: {
    type: Array[Object],
    required: true,
  },
})

const router = useRouter()

const onEditUser = id => router.push(`/edit/${id}`)
const onDeleteUser = id => router.push(`/delete/${id}`)
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
  border-radius: 50%;
  width: var(--table-avatar-size);
}
.icon {
  margin-right: 1em;
}
</style>
