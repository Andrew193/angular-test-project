import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective(document.createElement("li"));
    expect(directive).toBeTruthy();
  });
});
