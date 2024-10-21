<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

</script>

<template>
  <div class="modal-mask" @click="closeModal">
    <div class="modal" @click.stop>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background-color: white;
  border-radius: 16px;
  padding: 48px 24px 24px 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}
</style>
