<script lang="ts" setup>
type TabItem = {
  text: string;
  active?: boolean;
  click: Function;
  show: boolean;
};

type TabsNavProps = {
  show: boolean;
  items: TabItem[];
};

const props = defineProps<TabsNavProps>();

const linkClasses = (active: boolean | undefined) => {
  if (active)
    return [
      'flex',
      'items-center',
      'w-fit',
      'px-4',
      'h-10',
      'rounded-t-lg',
      'border-2',
      'border-primary',
      'bg-primary',
      'text-light',
      'cursor-pointer',
    ];

  return [
    'flex',
    'items-center',
    'w-fit',
    'px-4',
    'h-10',
    'text-gray-darken',
    'rounded-t-lg',
    'border-light',
    'border-2',
    'cursor-pointer',
  ];
};
</script>

<template>
  <ul class="flex gap-4" v-if="props.show">
    <li
      v-for="(item, index) in props.items"
      :key="index"
      class="w-fit h-fit font-baloo2-bold"
    >
      <a v-if="item.show" :class="linkClasses(item.active)" @click="item.click">
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>
