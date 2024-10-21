<script setup>
import { defineEmits } from 'vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue';
import IconRightArrow from '@/components/icons/IconRightArrow.vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['prev', 'next', 'goToPage'])

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('prev');
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('next');
  }
}

const goToPage = page => {
  emit('goToPage', page);
}

</script>

<template>
  <div class="pagination">
    <ButtonComponent
      @click="prevPage"
      :disabled="currentPage === 1"
      label="PREVIOUS"
      variant="secondary"
      class="pagination__nav"
    >
      <template #icon>
        <IconLeftArrow />
      </template>
    </ButtonComponent>

    <div class="pagination__buttons">
      <ButtonComponent
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :square="true"
        :label="page.toString()"
        :variant="page === currentPage ? 'primary' : 'secondary'"
        :class="{ 'pagination__button--current': page === currentPage }"
      />
    </div>

    <ButtonComponent
      @click="nextPage"
      :disabled="currentPage === totalPages"
      label="NEXT"
      variant="secondary"
      class="pagination__nav"
    >
      <template #icon>
        <IconRightArrow />
      </template>
    </ButtonComponent>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_mixins';

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-grow: 1;
  }

  &__nav {
    @include respond-to(md) {
      width: 100%;
    }
  }

  @include respond-to(md) {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
