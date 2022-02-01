import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('check componet is runder correctly', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).to.contain('News');
  });
});
