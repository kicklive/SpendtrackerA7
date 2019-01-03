import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenttestComponent } from './parenttest.component';

describe('ParenttestComponent', () => {
  let component: ParenttestComponent;
  let fixture: ComponentFixture<ParenttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
