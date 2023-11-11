import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresDeStagesComponent } from './offres-de-stages.component';

describe('OffresDeStagesComponent', () => {
  let component: OffresDeStagesComponent;
  let fixture: ComponentFixture<OffresDeStagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffresDeStagesComponent]
    });
    fixture = TestBed.createComponent(OffresDeStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
