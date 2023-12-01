// import { Note } from 'src/app/models/note';
import { Evaluations } from './../../models/evaluation';
import { Component, NgModule, OnInit } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';



@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css']
})

export class ProfsComponent {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }


//   showEvaluation:boolean=false;
//   showNote:boolean=false;

//   afficherEvaluation(){
//     this.showEvaluation=!this.showEvaluation;
//   }
//   afficherNote(){
//     this.showNote=!this.showNote;
//   }
// //   evaluations: Evaluations[] = [];
// //   notes: Note[] = [];

//   evaluations: Evaluations[] = [];
//   nouvelleEvaluation: Evaluations = {
//     id:0,
//     semestre: '',
//     date: new Date(),
//     type: '',
//     anneeScolaire: '',
//     etat: 'En cours',
//     matiere: ''

//   };
//   imageUrl:String="assets/logo.png";

// //   constructor(private profService: FormateurService ) {}

//   ngOnInit(): void {
//     // this.evaluations = this.profService.getEvaluations();
//   }
//   // showprogrammerEvaluation: boolean=true;
//   programmerEvaluation(): void {

//     // this.profService.programmerEvaluation(this.nouvelleEvaluation);
//     this.nouvelleEvaluation = {
//       id: 0,
//       semestre: '',
//       date: new Date(),
//       type: '',
//       anneeScolaire: '',
//       etat: 'En cours',
//       matiere: ''
//     };
//   }

//   supprimerEvaluation(id: number): void {
//     // this.profService.supprimerEvaluation(id);
//   }
}
