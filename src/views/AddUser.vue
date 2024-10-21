<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import IconAddImage from '@/components/icons/IconAddImage.vue';
import FileUploadComponent from '@/components/common/FileUploadComponent.vue';
import InputComponent from '@/components/common/InputComponent.vue';
import userImg from '@/assets/imgs/undraw_male_avatar.svg';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconRotation from '@/components/icons/IconRotation.vue';

const store = useStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const avatarPreview = ref('');
const avatarFile = ref(null);

const isLoading = computed(() => store.getters.isLoading);
const errorMessage = computed(() => store.getters.errorMessage);

const onFileSelected = file => {
  avatarFile.value = file;

  const reader = new FileReader();
  reader.onload = e => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onFileError = error => {
  alert(error);
};

const submitForm = async () => {
  const userData = {
    first_name: firstName.value,
    last_name: lastName.value,
    avatar: avatarFile.value ? avatarFile.value : avatarPreview.value,
  };

  try {
    await store.dispatch('createUser', userData);
    await router.push('/');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
</script>

<template>
  <div class="add-user">
    <div class="card flex direction-column">
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

      <div class="flex-center-between">
        <InputComponent
          v-model="firstName"
          label="First Name"
          id="firstName"
          required
          class="flex-1"
        />
        <InputComponent
          v-model="lastName"
          label="Last Name"
          id="lastName"
          required
          class="flex-1"
        />
      </div>
      <ButtonComponent
        class="margin-top-auto"
        @click="submitForm"
        label="Add User"
        :disabled="firstName.length < 2 || lastName.length < 2 || !avatarFile || isLoading"
      >
        <template #icon>
          <IconRotation v-if="isLoading" :isRotating="true" />
          <IconAdd v-else />
        </template>
      </ButtonComponent>
    </div>

    <div class="card flex-center direction-column">
      <AvatarComponent size="large" :src="avatarPreview || userImg" />
      <FileUploadComponent
        class="width-100 margin-top-auto"
        buttonLabel="Upload Photo"
        @file-selected="onFileSelected"
        @error="onFileError"
      >
        <template #icon>
          <IconAddImage />
        </template>
      </FileUploadComponent>
    </div>
  </div>
</template>

<style scoped>
.add-user {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  min-height: 35vh;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
