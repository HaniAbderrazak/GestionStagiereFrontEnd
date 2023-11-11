import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagieresComponent } from './stagieres.component';

describe('StagieresComponent', () => {
  let component: StagieresComponent;
  let fixture: ComponentFixture<StagieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagieresComponent]
    });
    fixture = TestBed.createComponent(StagieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
