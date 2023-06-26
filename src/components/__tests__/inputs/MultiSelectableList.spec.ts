import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import MultiSelectableList from '@/components/inputs/MultiSelectableList.vue';

describe('MultiSelectableList', () => {
  it('selected only first item of list with only one item', async () => {
    const wrapper = mount(MultiSelectableList, {
      props: {
        options: [{ value: 12, text: 'Rio de Janeiro' }],
      },
    });

    await wrapper.find('ul > li').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.flat().flat()).toContain(12);
  });

  it('selected first and last items of list with four items', async () => {
    const wrapper = mount(MultiSelectableList, {
      props: {
        modelValue: [],
        options: [
          { value: 12, text: 'Rio de Janeiro' },
          { value: 13, text: 'São Paulo' },
          { value: 16, text: 'Coxim' },
          { value: 19, text: 'Campo Grande' },
        ],
      },
    });

    await wrapper.find('ul > li:first-child').trigger('click');
    await wrapper.find('ul > li:last-child').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.flat().flat()).toContain(12);
    expect(wrapper.emitted('update:modelValue')?.flat().flat()).toContain(19);
  });

  it('toggle the first item of list with four items', async () => {
    const wrapper = mount(MultiSelectableList, {
      props: {
        modelValue: [],
        options: [
          { value: 12, text: 'Rio de Janeiro' },
          { value: 13, text: 'São Paulo' },
          { value: 16, text: 'Coxim' },
          { value: 19, text: 'Campo Grande' },
        ],
      },
    });

    await wrapper.find('ul > li:first-child').trigger('click');
    await wrapper.find('ul > li:first-child').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.flat().flat()).toEqual([]);
  });
});
