<script setup>
import { defineEmits } from 'vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import deleteIcon from '@/assets/imgs/undraw_clean_up.svg';
import ModalComponent from '@/components/common/ModalComponent.vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cancel', 'deleteUser']);

const handleCancel = () => {
  emit('cancel');
}

const handleDelete = () => {
  emit('deleteUser', props.user);
}

</script>

<template>
  <ModalComponent v-if="showModal" :show="false">
    <template #content>
      <img class="width-75" :src="deleteIcon" alt="Delete" />

      <h1 class="margin-0">
        Deleting user:
        <span class="primary-color"
          >{{ user.first_name }} {{ user.last_name }}</span
        >
      </h1>
      <p class="text-center margin-0">
        Are you sure you want to delete
        <span class="primary-color"
          >{{ user.first_name }} {{ user.last_name }}</span
        >? This action cannot be undone, and all associated data will be
        permanently removed. If you're certain, click "Delete" to proceed.
        Otherwise, select "Cancel" to abort this action.
      </p>

      <div class="flex-center-between margin-top-md">
        <ButtonComponent
          @click="handleCancel"
          label="Cancel"
          variant="secondary"
        />
        <ButtonComponent @click="handleDelete" label="Delete User">
          <template #icon>
            <IconDelete />
          </template>
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>
