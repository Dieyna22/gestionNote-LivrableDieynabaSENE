import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEvaluationComponent } from './gestion-evaluation.component';

describe('GestionEvaluationComponent', () => {
  let component: GestionEvaluationComponent;
  let fixture: ComponentFixture<GestionEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEvaluationComponent]
    });
    fixture = TestBed.createComponent(GestionEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
