<template>
  <div class="skeleton-table">
    <div v-for="n in 3" :key="n" class="skeleton-table__row">
      <div class="skeleton-table__cell skeleton-table__avatar">
        <Skeleton>
          <div class="skeleton-avatar"></div>
        </Skeleton>
      </div>

      <div class="skeleton-table__cell skeleton-table__text">
        <Skeleton>
          <slot name="text">
            <p :style="{ width: getRandomWidth() }"></p>
          </slot>
        </Skeleton>
      </div>

      <div class="skeleton-table__cell skeleton-table__actions">
        <Skeleton>
          <p :style="{ width: getRandomWidth(50, 80) }"></p>
        </Skeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import Skeleton from '@/components/skeleton/Skeleton.vue'
import { getRandomWidth } from '@/utils/getRandomWidth.js'

</script>

<style lang="scss" scoped>
.skeleton-table {
  display: table;
  width: 100%;

  &__row {
    display: table-row;
    margin-bottom: 10px;
  }

  &__cell {
    display: table-cell;
    padding: 12px;
    vertical-align: middle;
  }

  &__avatar {
    width: 7.5%;
  }

  &__text {
    width: auto;
  }

  &__actions {
    width: 10%;
    text-align: right;
  }
}

</style>
