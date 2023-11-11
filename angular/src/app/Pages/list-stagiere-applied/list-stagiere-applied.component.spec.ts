import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStagiereAppliedComponent } from './list-stagiere-applied.component';

describe('ListStagiereAppliedComponent', () => {
  let component: ListStagiereAppliedComponent;
  let fixture: ComponentFixture<ListStagiereAppliedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStagiereAppliedComponent]
    });
    fixture = TestBed.createComponent(ListStagiereAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
