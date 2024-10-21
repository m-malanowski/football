<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="localValue"
      :required="required"
      @input="emitValue"
      class="form-control"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

const emitValue = () => {
  emit('update:modelValue', localValue.value);
};

</script>

<style scoped lang="scss">
.form-control {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #E2E4EA;
  border-radius: var(--input-radius);
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
    border-width: 2px;
  }
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
