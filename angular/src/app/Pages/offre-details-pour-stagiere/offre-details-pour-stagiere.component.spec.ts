import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDetailsPourStagiereComponent } from './offre-details-pour-stagiere.component';

describe('OffreDetailsPourStagiereComponent', () => {
  let component: OffreDetailsPourStagiereComponent;
  let fixture: ComponentFixture<OffreDetailsPourStagiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDetailsPourStagiereComponent]
    });
    fixture = TestBed.createComponent(OffreDetailsPourStagiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
