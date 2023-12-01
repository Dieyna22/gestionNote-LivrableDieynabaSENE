import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService, Note } from 'src/app/service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: Note[] = [];
  noteForm: FormGroup;
  editingIndex: number | null = null;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      semestre: [null, Validators.required],
      annee_scolaire: [null, Validators.required],
      type_note: [null, Validators.required],
      matiere: [null, Validators.required],
      apprenant: [null, Validators.required],
      valeur: [null, Validators.required]
    });
  }
  ngOnInit() {
    // Appeler la méthode getNotes du service pour récupérer les notes
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  openModal(content: any) {
    this.editingIndex = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: Note) => {
        this.noteService.addNote(result);
      },
      () => {
        // Modal dismissed
      }
    );
  }

  openEditModal(content: any, index: number) {
    this.editingIndex = index;
    this.noteForm.patchValue(this.notes[index]);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result: Note) => {
        this.updateNote(this.editingIndex, result);
        this.editingIndex = null;
      },
      () => {
        // Modal dismissed
        this.editingIndex = null;
      }
    );
  }

  deleteNoteAndClose(index: number) {
    this.noteService.deleteNote(index);
    this.modalService.dismissAll();
  }

  saveNote() {
    if (this.noteForm.valid) {
      this.modalService.dismissAll();
      if (this.editingIndex !== null) {
        // Si nous sommes en mode d'édition, mettez à jour la note existante
        this.updateNote(this.editingIndex, this.noteForm.value);
      } else {
        // Sinon, ajoutez une nouvelle note
        this.noteService.addNote(this.noteForm.value);
      }
      this.noteForm.reset();
      this.editingIndex = null;
    }
  }

  updateNote(index: number | null, result: any) {
    if (index !== null) {
      const updatedNote: Note = { ...this.notes[index], ...result };
      this.noteService.updateNote(index, updatedNote);
    }
  }
}
