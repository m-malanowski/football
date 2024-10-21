<script setup>
import { defineEmits } from 'vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import cancelIcon from '@/assets/imgs/undraw_cancel.svg';
import ModalComponent from '@/components/common/ModalComponent.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'deleteUser']);

const handleClose = () => {
  emit('close');
}

</script>

<template>
  <ModalComponent v-if="showModal" :show="false">
    <template #content>
      <img class="width-75" :src="cancelIcon" alt="Delete" />

      <h1 class="margin-0">Error</h1>
      <p class="text-center margin-0">{{ errorMessage }}</p>

      <div class="flex margin-top-md width-100">
        <ButtonComponent
          @click="handleClose"
          label="UnderStood"
          variant="secondary"
          class="width-100"
        />
      </div>
    </template>
  </ModalComponent>
</template>
