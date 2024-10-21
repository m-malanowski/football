<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import FileUploadComponent from '@/components/common/FileUploadComponent.vue';
import InputComponent from '@/components/common/InputComponent.vue';
import DeleteUserModal from '@/components/modals/DeleteModal.vue';
import ErrorModal from '@/components/modals/ErrorModal.vue';
import IconAddImage from '@/components/icons/IconAddImage.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import userImg from '@/assets/imgs/undraw_male_avatar.svg';
import IconRotation from '@/components/icons/IconRotation.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const userId = route.params.id;

const firstName = ref('');
const lastName = ref('');
const avatarPreview = ref('');
const avatarFile = ref(null);
const user = ref(null);
const showModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');
const selectedUser = ref(null);
const isLoading = computed(() => store.getters.isLoading);

onMounted(async () => {
  try {
    const fetchedUser = await store.dispatch('fetchUser', userId);
    if (fetchedUser) {
      user.value = fetchedUser;
      firstName.value = fetchedUser.first_name;
      lastName.value = fetchedUser.last_name;
      avatarPreview.value = fetchedUser.avatar;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'User not found.';
    showErrorModal.value = true;
  }
});

const onFileSelected = file => {
  avatarFile.value = file;

  const reader = new FileReader();
  reader.onload = e => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onFileError = error => {
  errorMessage.value = error;
  showErrorModal.value = true;
};

const submitForm = async () => {
  const updatedData = {
    first_name: firstName.value,
    last_name: lastName.value,
    avatar: avatarFile.value ? avatarFile.value : avatarPreview.value,
  };

  await store.dispatch('updateUser', { id: userId, userData: updatedData });
  await router.push('/');
};

const deleteUser = () => {
  selectedUser.value = user.value;
  showModal.value = true;
};

const handleDeleteUser = async () => {
  await store.dispatch('deleteUser', userId);
  showModal.value = false;
  await router.push('/');
};

</script>

<template>
  <div class="edit-user">
    <div class="card flex direction-column">
      <div v-if="user" class="flex-center-between">
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

      <div class="flex-center-between margin-top-auto">
        <ButtonComponent
          @click="submitForm"
          label="Update User"
          :disabled="firstName.length < 2 || lastName.length < 2 || isLoading"
        >
          <template #icon>
            <IconRotation v-if="isLoading" :isRotating="true" />
            <IconAdd v-else />
          </template>
        </ButtonComponent>
        <ButtonComponent
          class="margin-top-auto"
          @click="deleteUser"
          label="Delete User"
          type="button"
          variant="secondary"
        >
          <template #icon>
            <IconDelete />
          </template>
        </ButtonComponent>
      </div>
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

    <DeleteUserModal
      v-if="showModal"
      :showModal="showModal"
      :user="selectedUser"
      @cancel="showModal = false"
      @deleteUser="handleDeleteUser"
    />

    <ErrorModal
      v-if="showErrorModal"
      :showModal="showErrorModal"
      :errorMessage="errorMessage"
      @close="showErrorModal = false"
    />
  </div>
</template>

<style scoped>
.edit-user {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  min-height: 30vh;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
