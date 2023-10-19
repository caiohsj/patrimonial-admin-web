<script lang="ts" setup>
import { ref } from 'vue';
import InputGroup from './InputGroup.vue';

type InputWithSelectProps = {
  label: string;
  name: string;
  modelValue?: string;
  rules?: string;
  listItems: Array<string>;
};

const inputValue = ref('');

const props = defineProps<InputWithSelectProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void;
  (event: 'selected'): void;
}>();

const handleItemClicked = (item: string) => {
  emit('update:modelValue', item);
  inputValue.value = item;
  emit('selected');
};
</script>

<template>
  <div class="relative">
    <InputGroup
      :name="props.name"
      :label="props.label"
      type="text"
      v-model="inputValue"
      autocomplete="off"
      @input="emit('update:modelValue', inputValue)"
    />
    <ul
      v-if="props.listItems.length > 0"
      class="bg-white flex flex-col absolute z-10 rounded-md shadow-xl"
    >
      <li
        v-for="(value, index) in props.listItems"
        :key="index"
        @click="handleItemClicked(value)"
        class="p-2 cursor-pointer hover:bg-success hover:text-white"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>
