<template>
  <PageHeader label="User list"></PageHeader>

  <BoxContainer class="container">
    <div class="panel">
      <div class="search-panel">
        <input
          id="search"
          type="text"
          placeholder="Search for users..."
          v-model="search"
        />
        <label for="search">
          <FontAwesomeIcon class="icon" :icon="faSearch" />
        </label>
      </div>
      <button type="button" class="primary" @click="onAddUser()">
        <FontAwesomeIcon class="icon" :icon="faPlus" />
        Add User
      </button>
    </div>

    <LoadingContent v-if="loading" />
    <ErrorAlert v-if="error">{{ error }}</ErrorAlert>
    <UsersTable v-if="users" :users="users.data" @reload="onReload()" />
  </BoxContainer>

  <UsersTablePagination
    v-if="users"
    :page="$props.page"
    :per-page="users.per_page"
    :total-pages="users.total_pages"
    @change="onChangePage"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { GetUsers } from '@/api'
import PageHeader from '@/components/PageHeader.vue'
import UsersTable from '@/components/UsersTable.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import BoxContainer from '@/components/BoxContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import UsersTablePagination from '@/components/UsersTablePagination.vue'

/**
 * PROPS
 */
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})

/**
 * REFS
 */
const search = ref(null)
const loading = ref(false)
const users = ref(null)
const error = ref(null)

/**
 * METHODS
 */
const router = useRouter()

const onAddUser = () => router.push(`/add/`)
const onChangePage = page => router.push(`/${page}`)

const fetchData = async ({ page, search }) => {
  error.value = users.value = null
  loading.value = true

  try {
    users.value = await GetUsers(page, search || '')
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

const onReload = () => fetchData({ page: props.page, search: search.value })

/**
 * UTILS
 */
watch(() => ({ page: props.page, search: search.value }), fetchData, {
  immediate: true,
})
</script>

<style scoped>
.container {
  padding: 1.5em;

  .panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2em;

    .search-panel {
      position: relative;

      input {
        padding-right: 3em;

        & + label svg {
          transition: color 0.3s;
        }

        &:hover + label svg,
        &:focus + label svg {
          color: var(--icons-color-hover);
        }
      }

      label {
        position: absolute;
        right: 1em;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    button svg {
      color: var(--primary-color);
      margin-right: 0.5em;
    }
  }
}

@media (max-width: 500px) {
  .container {
    flex-direction: column;

    .panel {
      flex-direction: column-reverse;
      gap: 1em;

      .search-panel input {
        width: 100%;
      }
    }
  }
}
</style>
