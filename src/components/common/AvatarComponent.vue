<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Avatar',
  },
  size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
});

const sizeInPx = computed(() => {
  switch (props.size) {
    case 'small':
      return '50px';
    case 'medium':
      return '100px';
    case 'large':
      return '150px';
    default:
      return '50px';
  }
});
</script>

<template>
  <div class="avatar" :style="{ width: sizeInPx, height: sizeInPx }">
    <img class="avatar__img" :src="src" :alt="alt" />
  </div>
</template>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
