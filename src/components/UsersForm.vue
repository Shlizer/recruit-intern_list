<template>
  <form>
    <BoxContainer class="form-info">
      <div class="data">
        <div>
          <label>
            First Name
            <FontAwesomeIcon
              class="icon small interactable"
              :icon="faAsterisk"
              v-if="isDirtyProp('first_name') && props.allowRevert"
              @click="onRevert('first_name')"
            />
          </label>
          <input v-model="user.first_name" />
        </div>
        <div>
          <label>
            Last Name
            <FontAwesomeIcon
              class="icon interactable"
              :icon="faAsterisk"
              v-if="isDirtyProp('last_name') && props.allowRevert"
              @click="onRevert('last_name')"
            />
          </label>
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
          v-if="isDirtyProp('avatar') && props.allowRevert"
          type="button"
          class="alert"
          value="Revert"
          @click="onRevert('avatar')"
        />
      </div>
    </BoxContainer>
    <input
      type="button"
      class="primary"
      :value="$props.submitLabel"
      :disabled="$props.submitDisabled"
      @click="onSubmit()"
    />
  </form>

  <ConfirmModal
    :show="showModal"
    title="Unsaved progress"
    content="You have unsaved progress. Do you want to leave?"
    @confirm="onConfirmDirtyLeave"
    @cancel="onCancelDirtyLeave"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import BoxContainer from './BoxContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera, faAsterisk } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from './ConfirmModal.vue'

/**
 * PROPS
 */
const props = defineProps({
  user: {
    first_name: { type: String, requred: true },
    last_name: { type: String, requred: true },
    avatar: { type: String, requred: true },
  },
  allowRevert: Boolean,

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
  afterSubmitCallback: Function,
})

/**
 * REFS
 */
const user = ref({
  first_name: '',
  last_name: '',
  avatar: '',
  ...props.user,
})
const userOriginal = ref({
  first_name: '',
  last_name: '',
  avatar: '',
  ...props.user,
})
const avatarFile = ref(null)
const avatarImage = ref(null)
const showModal = ref(false)
const forceLeavePath = ref(null)

/**
 * METHODS
 */
const router = useRouter()
router.beforeEach((to, _from, next) => {
  if (forceLeavePath.value === null && Object.keys(getChangedValues()).length) {
    showModal.value = true
    forceLeavePath.value = to
    next(false)
  } else {
    window.removeEventListener('beforeunload', preventUnload)
    next()
  }
})

const isDirtyProp = propName => {
  if (propName === 'avatar') return avatarFile.value !== null
  return user.value[propName] !== userOriginal.value[propName]
}

const getChangedValues = () => {
  let changedValues = {}

  if (isDirtyProp('first_name'))
    changedValues.first_name = user.value.first_name
  if (isDirtyProp('last_name')) changedValues.last_name = user.value.last_name
  if (isDirtyProp('avatar')) changedValues.avatar = avatarFile.value
  return changedValues
}

const onAvatarChanged = $event => {
  const target = $event.target
  if (target && target.files) {
    avatarFile.value = target.files[0]
    avatarImage.value = URL.createObjectURL(avatarFile.value)
  }
}

const onRevert = propName => {
  if (propName === 'avatar')
    return (avatarFile.value = avatarImage.value = null)
  user.value[propName] = userOriginal.value[propName]
}

const onSubmit = async () => {
  let changedValues = getChangedValues()

  if (Object.keys(changedValues).length === 0) {
    toast.error("There was no change in form's data.")
    return
  }

  let toFill = []

  if (
    changedValues.first_name === '' ||
    (userOriginal.value.first_name === '' && !changedValues.first_name)
  )
    toFill.push('first name')
  if (
    changedValues.last_name === '' ||
    (userOriginal.value.last_name === '' && !changedValues.last_name)
  )
    toFill.push('last name')
  if (!userOriginal.value.avatar && !avatarImage.value) toFill.push('avatar')

  if (toFill.length) {
    toast.error(`Fields that need to be filled: ${toFill.join(', ')}`)
    return
  }

  if (await props.submitCallback(changedValues)) {
    userOriginal.value = { ...user.value }
    forceLeavePath.value = null
    avatarFile.value = null

    props.afterSubmitCallback?.()
  }
}

const onConfirmDirtyLeave = () => {
  router.push(forceLeavePath.value)
}

const onCancelDirtyLeave = () => {
  forceLeavePath.value = null
  showModal.value = false
}

const handleDirtyState = changesCount => {
  if (changesCount > 0) window.addEventListener('beforeunload', preventUnload)
  else window.removeEventListener('beforeunload', preventUnload)
}

const preventUnload = event => {
  event.preventDefault()
  event.returnValue = '' // Chrome requires returnValue to be set.
}

/**
 * UTILS
 */
watch(() => Object.keys(getChangedValues()).length, handleDirtyState, {
  immediate: true,
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  gap: 2em;
  align-items: stretch;

  & > input {
    display: none;
  }

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

    & > input {
      display: block;
    }

    .form-info {
      & .data {
        display: flex;
        flex-direction: column;
        margin-top: 0;
        margin-bottom: 1em;
      }

      & .actions {
        display: none;
      }
    }
  }
}
</style>
