import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildetestComponent } from './childetest.component';

describe('ChildetestComponent', () => {
  let component: ChildetestComponent;
  let fixture: ComponentFixture<ChildetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
