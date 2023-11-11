import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnothorizedComponent } from './unothorized.component';

describe('UnothorizedComponent', () => {
  let component: UnothorizedComponent;
  let fixture: ComponentFixture<UnothorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnothorizedComponent]
    });
    fixture = TestBed.createComponent(UnothorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
