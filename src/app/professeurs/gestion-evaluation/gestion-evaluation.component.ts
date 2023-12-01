import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Evaluations } from 'src/app/models/evaluation';
import { GestionNotesService } from 'src/app/service/gestion-notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrls: ['./gestion-evaluation.component.css']
})
export class GestionEvaluationComponent implements OnInit {
  boutonActif = 1;
  selectedNavItem: string = 'evaluations';
  changeNavItem(item: string): void {
    this.selectedNavItem = item;
  }

  db: any;
  dbMatiere: any;
  tabFormateur: any;
  formateurConnect:any;
  
  evaluations: Evaluations[] = [];
  evaluationFormModel: any = {
    semester: '',
    date: new Date(),
    type: '',
    status: '',
    subject: '',
    Classe: '',
    grade: null
  };

  modalRef: NgbModalRef | undefined;

  constructor(private route: ActivatedRoute, private evaluationService: GestionNotesService, private modalService: NgbModal) { }
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  private saveToLocalStorage() {
    localStorage.setItem('evaluations', JSON.stringify(this.evaluations));
    this.tabEvaluation = JSON.parse(localStorage.getItem("evaluations") || "[]");
  }

  tabEvaluation: any;
  idLastEvaluation: number=0;

  ngOnInit() {

    this.evaluationService.evaluations$.subscribe((evaluations) => {
      this.evaluations = evaluations;
    });

    this.tabFormateur = JSON.parse(localStorage.getItem("formateurs") || "[]");
    // On récupère l'objet qui s'est connecté 
    this.formateurConnect = this.tabFormateur.find((element: any) => element.idFormateur  == this.idUserConnect);
    console.log(this.formateurConnect);

    this.dbMatiere = JSON.parse(localStorage.getItem("matieres") || "[]");
    console.log(this.dbMatiere);

    this.db = JSON.parse(localStorage.getItem("Classes") || "[]");

    // On vérifie si le tableau n'est pas vide 
    if (this.tabEvaluation.length) {
      console.warn("taille du tab");
      this.idLastEvaluation = this.tabEvaluation[this.tabEvaluation.length - 1].idEvaluation
;
      console.log(this.idLastEvaluation)
    }
    else {
      this.idLastEvaluation = 0;
      console.warn("idLastEvaluation = 0")
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  saveEvaluation() {
    const evaluation: Evaluations = {
      idEvaluation: this.idLastEvaluation + 1,
      semester: this.evaluationFormModel.semester,
      date: this.evaluationFormModel.date,
      type: this.evaluationFormModel.type,
      status: this.evaluationFormModel.status,
      subject: this.evaluationFormModel.subject,
      Classe: this.evaluationFormModel.classe,
      grade: null
    };

    if (evaluation.status === 'faite') {
      // Seul le professeur peut noter une apprenante si l'évaluation est à l'état "faite"
      evaluation.grade = this.evaluationFormModel.grade;
    }

    this.evaluationService.saveEvaluation(evaluation);

    // Réinitialiser le modèle du formulaire après la soumission
    this.evaluationFormModel = {
      semester: '',
      date: new Date(),
      type: '',
      status: '',
      subject: '',
      Classe: '',
      grade: null
    };

    // Fermer le modal après la soumission
    this.closeModal();
  }


  closeModal() {
    this.modalService.dismissAll();
  }

  deleteEvaluation(index: number) {
    if (this.evaluations[index].status === 'faite') {
      // Ne supprimez pas une évaluation faite
      alert("Impossible de supprimer une évaluation déjà faite.");
      return;
    }

    this.evaluationService.deleteEvaluation(index);
  }
  assignGrade(index: number, gradeInput: number | null) {
    const evaluation = this.evaluations[index];

    if (evaluation.status === 'en_cours' || evaluation.status === 'reportee') {
      // L'évaluation est en cours ou reportée, ne permet pas d'attribuer une note

      alert("Impossible d'attribuer une note à une évaluation en cours ou reportée.");
      return;
    }

    if (gradeInput !== null) {
      const grade = parseFloat(gradeInput.toString());
      if (!isNaN(grade) && grade >= 0 && grade <= 20) {
        this.evaluationService.assignGrade(index, grade);
      } else {
        alert("Veuillez entrer une note valide entre 0 et 20.");
      }
    } else {
      alert("La note est nulle.");
    }
  }
}
// 😫😫sonou na si li