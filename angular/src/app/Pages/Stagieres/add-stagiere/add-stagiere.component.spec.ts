import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStagiereComponent } from './add-stagiere.component';

describe('AddStagiereComponent', () => {
  let component: AddStagiereComponent;
  let fixture: ComponentFixture<AddStagiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStagiereComponent]
    });
    fixture = TestBed.createComponent(AddStagiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
