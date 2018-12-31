import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { STComponent } from './ST.component';

describe('STComponent', () => {
  let component: STComponent;
  let fixture: ComponentFixture<STComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(STComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
