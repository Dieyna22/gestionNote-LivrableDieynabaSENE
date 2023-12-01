import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMatieresComponent } from './gestion-matieres.component';

describe('GestionMatieresComponent', () => {
  let component: GestionMatieresComponent;
  let fixture: ComponentFixture<GestionMatieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionMatieresComponent]
    });
    fixture = TestBed.createComponent(GestionMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
