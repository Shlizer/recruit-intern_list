<template>
  <ul v-if="$props.totalPages > 1">
    <li @click="onChangePage(page - 1)">
      <FontAwesomeIcon
        v-bind:class="page > 1 ? 'active icon' : 'icon'"
        :icon="faAnglesLeft"
      />
    </li>
    <li
      v-bind:class="page === $props.page ? 'current' : ''"
      v-for="page in $props.totalPages"
      v-bind:key="page"
      @click="onChangePage(page)"
    >
      {{ page }}
    </li>
    <li @click="onChangePage(page + 1)">
      <FontAwesomeIcon
        v-bind:class="page < $props.totalPages ? 'active icon' : 'icon'"
        :icon="faAnglesRight"
      />
    </li>
  </ul>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
/**
 * PROPS
 */
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  onChange: {
    type: Function,
    required: true,
  },
})

/**
 * METHODS
 */
const onChangePage = page => {
  if (page >= 1 && page <= props.totalPages) {
    props.onChange(page)
  }
}
</script>

<style scoped>
ul {
  margin-top: 2em;
  display: flex;

  li {
    display: block;
    border: 1px solid var(--input-border);
    border-left: 0;
    padding: 0.4em 0.8em;
    color: var(--primary-background);
    background-color: var(--primary-color);
    cursor: pointer;

    &:first-child {
      border-left: 1px solid var(--input-border);
    }
  }

  .current {
    color: var(--primary-color);
    background-color: var(--primary-background);
  }

  svg {
    width: 0.7em;

    &.active {
      color: var(--primary-background);
    }
  }
}
</style>
