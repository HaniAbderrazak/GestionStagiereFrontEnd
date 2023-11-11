import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStagiereComponent } from './update-stagiere.component';

describe('UpdateStagiereComponent', () => {
  let component: UpdateStagiereComponent;
  let fixture: ComponentFixture<UpdateStagiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStagiereComponent]
    });
    fixture = TestBed.createComponent(UpdateStagiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
