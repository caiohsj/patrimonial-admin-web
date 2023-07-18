import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TabsNav from '@/components/navs/TabsNav.vue';

describe('TabsNav', () => {
  it('render tabs when show true', () => {
    const wrapper = mount(TabsNav, {
      props: {
        items: [
          { text: 'Tab 1', click: () => {} },
          { text: 'Tab 1', click: () => {} },
        ],
        show: true,
      },
    });

    const tabsUl = wrapper.find('ul');
    const items = wrapper.findAll('ul > li');

    expect(tabsUl.exists()).toBe(true);
    expect(items.length).toEqual(2);
  });

  it('no render tabs when show false', () => {
    const wrapper = mount(TabsNav, {
      props: {
        items: [
          { text: 'Tab 1', click: () => {} },
          { text: 'Tab 1', click: () => {} },
        ],
        show: false,
      },
    });

    const tabsUl = wrapper.find('ul');
    const items = wrapper.findAll('ul > li');

    expect(tabsUl.exists()).toBe(false);
    expect(items.length).toEqual(0);
  });
});
