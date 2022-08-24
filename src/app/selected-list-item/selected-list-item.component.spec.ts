import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedListItemComponent } from './selected-list-item.component';

describe('SelectedListItemComponent', () => {
  let component: SelectedListItemComponent;
  let fixture: ComponentFixture<SelectedListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
