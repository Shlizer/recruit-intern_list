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
          @click="editUser(user.id)"
          class="icon"
          :icon="faPenToSquare"
        />
        <FontAwesomeIcon
          @click="deleteUser(user.id)"
          class="icon"
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

const router = useRouter()

const editUser = id => {
  console.log(id)
  router.push(`/edit/${id}`)
}

defineProps({
  users: {
    type: Array[Object],
    required: true,
  },
})
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
  color: var(--icons-color);
  margin-right: 1em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--icons-color-hover);
  }
}
</style>
