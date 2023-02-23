import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseButton from '@/components/buttons/BaseButton.vue';

describe('BaseButton', () => {
  it('emitted click', () => {
    const wrapper = mount(BaseButton, {
      props: {
        text: 'Meu botão',
        type: 'button',
      },
    });

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('emitted submit', () => {
    const wrapper = mount(BaseButton, {
      props: {
        text: 'Meu botão',
        type: 'submit',
      },
    });

    wrapper.find('button').trigger('submit');

    expect(wrapper.emitted()).toHaveProperty('submit');
  });
});
