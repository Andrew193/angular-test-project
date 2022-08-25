import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudListItemComponent } from './crud-list-item.component';

describe('SelectedListItemComponent', () => {
  let component: CrudListItemComponent;
  let fixture: ComponentFixture<CrudListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
