import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfsComponent } from './gestion-profs.component';

describe('GestionProfsComponent', () => {
  let component: GestionProfsComponent;
  let fixture: ComponentFixture<GestionProfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProfsComponent]
    });
    fixture = TestBed.createComponent(GestionProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
