import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbudgetsComponent } from './listbudgets.component';

describe('ListbudgetsComponent', () => {
  let component: ListbudgetsComponent;
  let fixture: ComponentFixture<ListbudgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbudgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
