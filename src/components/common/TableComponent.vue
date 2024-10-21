<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})

</script>

<template>
  <table class="table">
    <slot name="colgroup"></slot>
    <thead class="table__head">
    <tr class="table__row">
      <th
        class="table__header"
        v-for="column in columns"
        :key="column.key"
      >
        {{ column.label }}
      </th>
    </tr>
    </thead>
    <tbody class="table__body">
    <tr class="table__row" v-for="row in data" :key="row.id">
      <td v-for="column in columns" :key="column.key" class="table__cell">
        <slot :name="column.slot" :row="row">
          {{ row[column.key] }}
        </slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>


<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;

  &__head {
    background-color: transparent;

    .table__row {}
  }

  &__body {
    .table__row {
      &:nth-child(odd) {
        background-color: var(--app-color);
        &:hover {
          background-color: rgba(245, 247, 249, 0.6);
        }
      }

      &:hover {
        background-color: rgba(245, 247, 249, 0.6);
      }
    }
  }

  &__header {
    padding: 12px 8px;
    text-align: left;
  }

  &__sort-indicator {
    margin-left: 8px;
    font-size: 12px;
  }

  &__cell {
    padding: 12px 8px;
  }

  @media (max-width: 1024px) {
    &__cell {
      padding: 8px 4px;
    }
  }
}
</style>
