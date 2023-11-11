import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiereDetailsComponent } from './stagiere-details.component';

describe('StagiereDetailsComponent', () => {
  let component: StagiereDetailsComponent;
  let fixture: ComponentFixture<StagiereDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagiereDetailsComponent]
    });
    fixture = TestBed.createComponent(StagiereDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
