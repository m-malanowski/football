<script setup>
import { ref, defineEmits, watch } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue'

const emit = defineEmits(['input']);

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
});

const localSearch = ref('');

watch(localSearch, (newVal) => {
  emit('input', newVal);
});

</script>

<template>
  <div class="search">
    <input
      type="text"
      class="search__form"
      v-model="localSearch"
      @input="$emit('input', localSearch)"
      :placeholder="placeholder"
    />
    <IconSearch class="search__icon"/>
  </div>
</template>

<style scoped lang="scss">
.search {
  position: relative;

  &__form {
    background-color: var(--app-color);
    padding: 10px 8px;;
    border: 2px solid var(--app-color);
    border-radius: var(--input-radius);
    width: 100%;
    transition: border-color 0.3s ease-in-out;
    &:focus {
      border-color: var(--primary-color);
      border-width: 2px;
      outline: none;
    }
  }

  &__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    //fill: var(--primary-color);
  }

  &:focus-within .search__icon path {
    fill: var(--primary-color);
  }
}
</style>
