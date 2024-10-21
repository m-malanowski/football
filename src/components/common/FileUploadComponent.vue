<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';

const props = defineProps({
  accept: {
    type: String,
    default: 'image/*',
  },
  maxFileSize: {
    type: Number,
    default: 2 * 1024 * 1024,
  },
  buttonLabel: {
    type: String,
    default: 'Upload File',
  },
  buttonClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['file-selected', 'error'])

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click();
}

const onFileChange = event => {
  const file = event.target.files[0];
  if (file) {
    if (props.accept && !file.type.match(props.accept.replace('*', '.*'))) {
      emit('error', 'Invalid file type.');
      return;
    }

    if (file.size > props.maxFileSize) {
      emit(
        'error',
        `File size should be less than ${props.maxFileSize / (1024 * 1024)}MB.`,
      )
      return;
    }

    emit('file-selected', file);
  }
}
</script>
<template>
  <div>
    <ButtonComponent
      class="width-100"
      :class="buttonClass"
      :label="buttonLabel"
      @click="triggerFileInput"
    >
      <template #icon>
        <slot name="icon"></slot>
      </template>
    </ButtonComponent>

    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      :accept="accept"
      style="display: none"
    />
  </div>
</template>
