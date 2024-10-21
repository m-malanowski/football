<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary'].includes(value),
  },
  square: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click']);

const handleClick = event => {
  emit('click', event);
}

</script>

<template>
  <div>
    <router-link
      v-if="to"
      :to="to"
      :class="['button', `button--${variant}`, { 'button--square': square }]"
    >
      <slot name="icon" />
      <span class="button__label">{{ label }}</span>
    </router-link>
    <button
      v-else
      :type="type"
      @click="handleClick"
      :class="['button', `button--${variant}`, { 'button--square': square }]"
      :disabled="disabled"
    >
      <slot name="icon" />
      <span class="button__label">{{ label }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_mixins';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  color: white;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  gap: 16px;
  width: inherit;
  min-width: 125px;
  border-radius: var(--input-radius);

  @include respond-to(md) {
    width: 100%;
  }

  &--primary {
    background-color: var(--primary-color);

    &:hover {
      background-color: var(--primary-color-high);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &--secondary {
    background-color: var(--app-color);
    color: var(--contrast-color-low);
    border: 2px solid var(--app-color);

    &:hover {
      color: var(--contrast-color-high);
      border: 2px solid var(--contrast-color-high);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &--square {
    width: 42px;
    height: 42px;
    min-width: 42px;
    padding: 0;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
}
</style>
