<template>
  <form>
    <BoxContainer class="form-info">
      <div class="data">
        <div>
          <label>First Name</label>
          <input v-model="user.first_name" />
        </div>
        <div>
          <label>Last Name</label>
          <input v-model="user.last_name" />
        </div>
      </div>
      <div class="actions">
        <input
          type="button"
          class="primary"
          :value="$props.submitLabel"
          :disabled="$props.submitDisabled"
          @click="onSubmit()"
        />
      </div>
    </BoxContainer>
    <BoxContainer class="form-avatar">
      <img v-if="avatarImage" :src="avatarImage" class="avatar" />
      <img v-if="!avatarImage" :src="user.avatar" class="avatar" />
      <div class="actions">
        <input
          type="file"
          id="upload-button"
          accept="image/*"
          @change="onAvatarChanged($event)"
          capture
        />
        <label class="input" for="upload-button">
          <FontAwesomeIcon :icon="faCamera" />
          Change photo
        </label>
        <input
          v-if="avatarImage"
          type="button"
          class="alert"
          value="Revert"
          @click="onRevert()"
        />
      </div>
    </BoxContainer>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BoxContainer from './BoxContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  user: {
    first_name: { type: String, requred: true },
    last_name: { type: String, requred: true },
    avatar: { type: String, requred: true },
  },

  submitLabel: {
    type: String,
    required: true,
  },
  submitDisabled: {
    type: Boolean,
    requred: true,
  },
  submitCallback: {
    type: Function,
    requred: true,
  },
})

const user = ref({
  first_name: '',
  last_name: '',
  avatar: '',
  ...props.user,
})
const userOriginal = ref({ ...props.user })
const avatarFile = ref(null)
const avatarImage = ref(null)

const getChangedValues = () => {
  let changedValues = {}

  if (user.value.first_name !== userOriginal.value.first_name)
    changedValues.first_name = user.value.first_name
  if (user.value.last_name !== userOriginal.value.last_name)
    changedValues.last_name = user.value.last_name
  if (avatarFile.value) changedValues.avatar = avatarFile.value
  return changedValues
}

const onAvatarChanged = $event => {
  const target = $event.target
  if (target && target.files) {
    avatarFile.value = target.files[0]
    avatarImage.value = URL.createObjectURL(avatarFile.value)
  }
}

const onRevert = () => {
  avatarFile.value = avatarImage.value = null
}

const onSubmit = async () => {
  let changedValues = getChangedValues()

  if (Object.keys(changedValues).length === 0) {
    console.warn("There was no change in form's data.")
    return
  }

  console.log(changedValues)
  if (await props.submitCallback(changedValues)) {
    userOriginal.value = { ...user.value }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  gap: 2em;
  align-items: stretch;

  .form-info {
    flex-basis: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .data {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-top: 2em;
      padding: 1.5em;
      gap: 1.5em;

      & > div {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        line-height: 3;
      }
    }
  }
  .form-avatar {
    flex-basis: 30%;
    text-align: center;

    .avatar {
      width: 50%;
      max-width: 250px;
      border-radius: 50%;
      margin: 3em;
    }

    #upload-button {
      display: none;

      & + label {
        display: block;
        padding: 0.3em;
        cursor: pointer;
        flex-grow: 1;

        & svg {
          color: var(--icons-color);
          margin-right: 0.5em;
        }
      }
    }
  }
}

.actions {
  display: flex;
  flex-direction: row;
  padding: 1.5em;
  gap: 1em;
}

.icon {
  color: var(--icons-color);
  width: 0.5em;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--icons-color-hover);
  }
}

@media (max-width: 1024px) {
  form {
    flex-direction: column;

    .form-info .data {
      display: flex;
      flex-direction: column;
      margin-top: 0;
      margin-bottom: 1em;
    }
  }
}
</style>
