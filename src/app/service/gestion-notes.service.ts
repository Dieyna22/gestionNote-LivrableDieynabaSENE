import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Evaluations } from '../models/evaluation';

@Injectable({
  providedIn: 'root',
})
export class GestionNotesService {
  private evaluationsSubject: BehaviorSubject<Evaluations[]> = new BehaviorSubject<Evaluations[]>([]);
  evaluations$ = this.evaluationsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  getEvaluations() {
    return this.evaluationsSubject.getValue();
  }

  saveEvaluation(evaluation: Evaluations) {
    const currentEvaluations = this.getEvaluations();
    this.evaluationsSubject.next([...currentEvaluations, evaluation]);
    this.saveToLocalStorage();
  }

  deleteEvaluation(index: number) {
    const currentEvaluations = this.getEvaluations();
    currentEvaluations.splice(index, 1);
    this.evaluationsSubject.next([...currentEvaluations]);
    this.saveToLocalStorage();
  }

  assignGrade(index: number, grade: number) {
    const currentEvaluations = this.getEvaluations();
    currentEvaluations[index].grade = grade;
    this.evaluationsSubject.next([...currentEvaluations]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('evaluations', JSON.stringify(this.getEvaluations()));
  }

  private loadFromLocalStorage() {
    const storedEvaluations = localStorage.getItem('evaluations');
    this.evaluationsSubject.next(storedEvaluations ? JSON.parse(storedEvaluations) : []);
  }
}
