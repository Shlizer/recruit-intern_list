<template>
  <div v-if="$props.show" class="modal">
    <BoxContainer>
      <h2 class="title" v-if="$props.title">{{ $props.title }}</h2>
      <div class="content" v-if="$props.content">{{ $props.content }}</div>

      <div class="actions">
        <input
          type="button"
          class="primary"
          value="Yes"
          @click="$props.onConfirm()"
        />
        <input
          type="button"
          class="alert"
          value="No"
          @click="$props.onCancel()"
        />
      </div>
    </BoxContainer>
  </div>
</template>

<script setup>
import BoxContainer from './BoxContainer.vue'

/**
 * PROPS
 */
defineProps({
  show: {
    type: Boolean,
    required: true,
  },

  title: String,
  content: String,

  onConfirm: {
    type: Function,
    required: true,
  },

  onCancel: {
    type: Function,
    required: true,
  },
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);

  & > div {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 50%;
    padding: 1em;

    .title {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 1em;
    }

    .actions {
      display: flex;
      justify-content: end;
      gap: 1em;
      margin-top: 1.5em;
    }
  }
}

@media (max-width: 780px) {
  .modal {
    & > div {
      top: 0;
      left: 0;
      margin: 2.5em;
      transform: none;
      max-width: none;
      width: calc(100% - 5em);

      .title {
        font-size: 1.5em;
      }

      .actions {
        justify-content: space-between;

        & input {
          padding: 0.8em 3em;
        }
      }
    }
  }
}
</style>
