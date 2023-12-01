// notes.module.ts
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserHeaderComponent } from 'src/app/header-footer/user-h-f/user-header/user-header.component';
import { UserFooterComponent } from 'src/app/header-footer/user-h-f/user-footer/user-footer.component';
import { NoteService } from 'src/app/service/note.service';
import { NotesComponent } from '../notes/notes.component';

@NgModule({
  declarations: [
    // Liste des composants de ce module
    NotesComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

    NoteService,
  ],
  exports: [
    // Composants que vous souhaitez rendre accessibles à d'autres modules
    NotesComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
})
export class NotesModule { }
