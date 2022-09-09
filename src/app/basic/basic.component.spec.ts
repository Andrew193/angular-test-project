import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicComponent} from './basic.component';

describe('BasicComponent', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create main page', () => {
    expect(component).toBeTruthy();
  });

  it('Should have main page headline', () => {
    const componentElement = fixture.debugElement.nativeElement;
    const mainPageHeader = componentElement.querySelector(".main-page-header");
    const mainPageHeaderContent = mainPageHeader.textContent;
    expect(mainPageHeaderContent).toEqual("Main page content")
  })
});
