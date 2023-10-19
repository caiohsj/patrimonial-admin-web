import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import InputWithSelect from '@/components/inputs/InputWithSelect.vue';

describe('InputGroup', () => {
  it('updated value', async () => {
    const wrapper = mount(InputWithSelect, {
      props: {
        label: 'State',
        name: 'state',
        modelValue: '',
        listItems: [],
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    await wrapper.find('input').setValue('Mato Grosso do Sul');

    expect(wrapper.props('modelValue')).toBe('Mato Grosso do Sul');
  });

  it('input emit', async () => {
    const wrapper = mount(InputWithSelect, {
      props: {
        label: 'State',
        name: 'state',
        modelValue: '',
        listItems: [],
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    await wrapper.find('input').setValue('Mato Grosso do Sul');

    expect(wrapper.props('modelValue')).toBe('Mato Grosso do Sul');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('input');
  });

  it('selected item on list', async () => {
    const wrapper = mount(InputWithSelect, {
      props: {
        label: 'State',
        name: 'state',
        modelValue: '',
        listItems: [],
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    await wrapper.find('input').setValue('Mato Grosso');

    await wrapper.setProps({
      listItems: ['Mato Grosso', 'Mato Grosso do Sul'],
    });

    await wrapper.find('ul > li:last-child').trigger('click');

    expect(wrapper.props('modelValue')).toBe('Mato Grosso do Sul');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()).toHaveProperty('selected');
  });
});
