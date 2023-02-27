import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import SelectGroup from '@/components/inputs/SelectGroup.vue';

describe('SelectGroup', () => {
  it('updated value', async () => {
    const wrapper = mount(SelectGroup, {
      props: {
        label: 'Branches',
        name: 'branch',
        modelValue: '',
        options: [{ value: '3', text: 'Coxim' }],
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    await wrapper.find('select').setValue('3');

    expect(wrapper.props('modelValue')).toBe('3');
  });
});
