import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupworkerComponent } from './signupworker.component';

describe('SignupworkerComponent', () => {
  let component: SignupworkerComponent;
  let fixture: ComponentFixture<SignupworkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
