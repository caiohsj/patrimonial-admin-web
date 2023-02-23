import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import InputGroup from '@/components/inputs/InputGroup.vue';

describe('InputGroup', () => {
  it('updated value', async () => {
    const wrapper = mount(InputGroup, {
      props: {
        label: 'Email',
        type: 'email',
        name: 'email',
        modelValue: '',
        'onUpdate:modelValue': (e: string) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    await wrapper.find('input').setValue('meu@email.com');

    expect(wrapper.props('modelValue')).toBe('meu@email.com');
  });
});
