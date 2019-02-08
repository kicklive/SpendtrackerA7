import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittransactionComponent } from './edittransaction.component';

describe('EdittransactionComponent', () => {
  let component: EdittransactionComponent;
  let fixture: ComponentFixture<EdittransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
