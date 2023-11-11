import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiereHomeComponent } from './stagiere-home.component';

describe('StagiereHomeComponent', () => {
  let component: StagiereHomeComponent;
  let fixture: ComponentFixture<StagiereHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagiereHomeComponent]
    });
    fixture = TestBed.createComponent(StagiereHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
