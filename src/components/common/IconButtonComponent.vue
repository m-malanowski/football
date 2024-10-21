<script setup>
import { defineEmits, computed } from 'vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['click']);

const iconMap = {
  edit: IconEdit,
  delete: IconDelete,
}

const currentIcon = computed(() => {
  return iconMap[props.name] || null;
})

const handleClick = event => {
  emit('click', event);
}
</script>

<template>
  <button @click="handleClick" class="icon-button" :title="title">
    <component :is="currentIcon" />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--contrast-color-low);

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
