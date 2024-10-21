import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';
import AddUser from '../views/AddUser.vue';
import EditUser from '../views/EditUser.vue';

const routes = [
  {
    path: '/',
    name: 'user-list',
    component: UserList,
    meta: { title: 'User List' },
  },
  {
    path: '/add-user',
    name: 'add-user',
    component: AddUser,
    meta: { title: 'Add User' },
  },
  {
    path: '/edit-user/:id',
    name: 'edit-user',
    component: EditUser,
    meta: { title: 'Edit User' },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
