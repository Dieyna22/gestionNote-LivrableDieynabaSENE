import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesKey = 'notes';
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {
    const storedNotes = JSON.parse(localStorage.getItem(this.notesKey) || '[]');
    this.notesSubject.next(storedNotes);
  }

  getNotes() {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note) {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = [...currentNotes, note];
    this.notesSubject.next(updatedNotes);
    localStorage.setItem(this.notesKey, JSON.stringify(updatedNotes));
  }

  deleteNote(index: number) {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = currentNotes.filter((_, i) => i !== index);
    this.notesSubject.next(updatedNotes);
    localStorage.setItem(this.notesKey, JSON.stringify(updatedNotes));
  }

  // Ajoutez la méthode pour mettre à jour une note existante
  updateNote(index: number, updatedNote: Note) {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = [...currentNotes];
    updatedNotes[index] = updatedNote;
    this.notesSubject.next(updatedNotes);
    localStorage.setItem(this.notesKey, JSON.stringify(updatedNotes));
  }
}

export interface Note {
  semestre: number;
  annee_scolaire: number;
  type_note: string;
  matiere: string;
  apprenant: string;
  valeur: number;
}
