<template>
  <div class="container">
    <PageTitle>
      {{ pageTitle }}
    </PageTitle>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="js">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from './components/common/PageTitle.vue';

const route = useRoute();
const pageTitle = computed(() => {
  return route.meta.title || route.name || "User List";
});

</script>
