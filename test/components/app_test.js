import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// Use 'describe' to group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('there is an header', () => {
    expect(component.find('.pageTitle')).to.exist;
  });

});
