import { AutofocusenterDirective } from './autofocusenter.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ForTestsComponent} from "../../for-tests/for-tests.component";
import {By} from "@angular/platform-browser";

describe('AutofocusenterDirective', () => {
  let fixture = ComponentFixture<ForTestsComponent>;
  let des;

  beforeEach(() => {
    let fixture = TestBed.configureTestingModule({
      declarations: [AutofocusenterDirective, ForTestsComponent]
    })
      .createComponent(ForTestsComponent);

    fixture.detectChanges(); // initial binding

    des = fixture.debugElement.queryAll(By.directive(AutofocusenterDirective));

    // the h2 without the HighlightDirective
    //  bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('should create an instance', () => {
    expect(des.length).toBe(0);
  });
});
