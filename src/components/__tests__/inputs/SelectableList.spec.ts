import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import SelectableList from '@/components/inputs/SelectableList.vue';

describe('SelectableList', () => {
  it('selected first item of list with only one item', async () => {
    const wrapper = mount(SelectableList, {
      props: {
        modelValue: '',
        options: [{ value: 12, text: 'Rio de Janeiro' }],
      },
    });

    await wrapper.find('ul > li').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.flat()).toContain(12)
  });

  it('selected last item of list with four items', async () => {
    const wrapper = mount(SelectableList, {
      props: {
        modelValue: '',
        options: [
          { value: 12, text: 'Rio de Janeiro' },
          { value: 13, text: 'São Paulo' },
          { value: 16, text: 'Coxim' },
          { value: 19, text: 'Campo Grande' },
        ],
      },
    });

    await wrapper.find('ul > li:last-child').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.flat()).toContain(19)
  });
});
