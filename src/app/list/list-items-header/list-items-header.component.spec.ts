import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsHeaderComponent } from './list-items-header.component';

describe('ListItemsHeaderComponent', () => {
  let component: ListItemsHeaderComponent;
  let fixture: ComponentFixture<ListItemsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
