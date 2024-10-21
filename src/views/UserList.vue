<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import TableComponent from '@/components/common/TableComponent.vue';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconButton from '@/components/common/IconButtonComponent.vue';
import PaginationComponent from '@/components/common/PaginationComponent.vue';
import { useRouter } from 'vue-router';
import { columns } from '@/utils/userTableColumns.js';
import SkeletonTable from '@/components/skeleton/SkeletonTable.vue';
import DeleteUserModal from '@/components/modals/DeleteModal.vue';

const store = useStore();
const router = useRouter();

const searchQuery = ref('');
const users = computed(() => store.getters.allUsers);
const isLoading = computed(() => store.getters.isLoading);
const currentPage = computed(() => store.getters.currentPage);
const totalUsers = computed(() => store.getters.totalUsers);
const perPage = computed(() => store.getters.usersPerPage);
const totalPages = computed(() => Math.ceil(totalUsers.value / perPage.value));

const showModal = ref(false);
const selectedUser = ref(null);

onMounted(() => {
  store.dispatch('fetchUsers', currentPage.value);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    store.dispatch('fetchUsers', currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    store.dispatch('fetchUsers', currentPage.value + 1);
  }
};

const editUser = user => {
  router.push({ name: 'edit-user', params: { id: user.id } });
};

const deleteUserAction = user => {
  selectedUser.value = user;
  showModal.value = true;
};

const handleDeleteUser = user => {
  store.dispatch('deleteUser', user.id);
  showModal.value = false;
};

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value;
  }
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    user.first_name.toLowerCase().includes(query) ||
    user.last_name.toLowerCase().includes(query)
  );
});

const handlePrevPage = () => {
  prevPage();
};

const handleNextPage = () => {
  nextPage();
};

const goToPage = page => {
  store.dispatch('fetchUsers', page);
};

</script>

<template>
  <div class="card">
    <div class="flex-center-between margin-bottom-lg">
      <SearchInput
        placeholder="Search for users..."
        @input="searchQuery = $event"
        class="width-50 width-50--full"
      />
      <ButtonComponent label="Add user" to="/add-user">
        <template #icon>
          <IconAdd />
        </template>
      </ButtonComponent>
    </div>

    <SkeletonTable v-if="isLoading"/>

    <div v-if="filteredUsers.length && !isLoading">
      <TableComponent :columns="columns" :data="filteredUsers">
        <template #colgroup>
          <colgroup>
            <col style="width: 7.5%" />
            <col style="width: auto" />
            <col style="width: 10%" />
          </colgroup>
        </template>
        <template #avatar="{ row }">
          <AvatarComponent :src="row.avatar" />
        </template>
        <template #fullName="{ row }">
          {{ row.first_name }} {{ row.last_name }}
        </template>
        <template #actions="{ row }">
          <IconButton
            name="edit"
            @click="editUser(row)"
            title="Edit"
            class="margin-right-xs"
          />
          <IconButton
            name="delete"
            @click="deleteUserAction(row)"
            title="Delete"
          />
        </template>
      </TableComponent>
      <PaginationComponent
        :currentPage="currentPage"
        :totalPages="totalPages"
        @prev="handlePrevPage"
        @next="handleNextPage"
        @goToPage="goToPage"
        class="margin-top-md"
      />
    </div>

    <p v-if="!isLoading && filteredUsers.length === 0">No users found.</p>

    <DeleteUserModal
      v-if="showModal"
      :showModal="showModal"
      :user="selectedUser"
      @cancel="showModal = false"
      @deleteUser="handleDeleteUser"
    />
  </div>
</template>
