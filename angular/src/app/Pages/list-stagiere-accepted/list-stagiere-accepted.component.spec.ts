import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStagiereAcceptedComponent } from './list-stagiere-accepted.component';

describe('ListStagiereAcceptedComponent', () => {
  let component: ListStagiereAcceptedComponent;
  let fixture: ComponentFixture<ListStagiereAcceptedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStagiereAcceptedComponent]
    });
    fixture = TestBed.createComponent(ListStagiereAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
