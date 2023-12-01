import { Component } from '@angular/core';
import { Matieres } from 'src/app/models/matiere';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-matieres',
  templateUrl: './gestion-matieres.component.html',
  styleUrls: ['./gestion-matieres.component.css']
})
export class GestionMatieresComponent {

  
  // Gestion bouton
  boutonActif = 1;
  matiereFound: any;

  currentContent: string = 'listeFormateurs'; // Initialiser le contenu actuel

  showContent(contentId: string): void {
    this.currentContent = contentId; // Mettre à jour le contenu actuel
  }

  // Initialisation du contenu actuel
  // Déclaration du tableau pour ajouter les apprenants
  matieres: Matieres[] = [];

  // Déclaration du tableau pour récuperer les classes
  db: any;
  
  // Attributs du formateurs
 
  nomMatiere: string = "";
  descriptionMatiere: string = "";

  // Appel de la methode ngOnInit de l'interface oninit 
  ngOnInit() {
    // console.log(this.users);
    if (!localStorage.getItem("matieres")) {
      localStorage.setItem("matieres", JSON.stringify(this.matieres));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabMatiere = JSON.parse(localStorage.getItem("matieres") || "[]");
    console.log(this.tabMatiere);

    this.matiereFound = this.tabMatiere[this.idLastMatiere-1];
    console.log(this.matiereFound);

  }

  // Notre tableau d'objets classes récupéré à partir du localstorage
 
  tabMatiere: any;
  idLastMatiere: number = 0;

  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }


  // Methode pour valider l'ajout du formateur

  ajoutMatiere() {
    // Phase de test
    // alert(this.nomMatiere);

    // Validation

    if(this.nomMatiere == "" ) {
        this.sweet('error','Attention','Renseigner la matière')
    }else if(this.descriptionMatiere == ""){
        this.sweet('error','Attention','Renseigner la description de cette matiére')
    } else {
      if (this.tabMatiere.length) {
        console.warn("taille du tab");
        this.idLastMatiere = this.tabMatiere[this.tabMatiere.length - 1].idMatiere;
        console.log(this.idLastMatiere)
      }else{
        this.idLastMatiere = 0
        console.log(this.idLastMatiere);
      }

      // Objet formateur
        let matiere = {
          idMatiere: this.idLastMatiere + 1,
          nomMatiere: this.nomMatiere,
          etatMatiere: 1,
          descriptionMatiere: this.descriptionMatiere,
          evaluations: []
        }

        // Ajout de l'objet formateur
        this.tabMatiere.push(matiere);

        localStorage.setItem("matieres", JSON.stringify(this.tabMatiere));

        // Message d'ajout
        this.sweet("success","Super","Formateur ajouté avec succès")

      console.log(this.tabMatiere.idFormateur);
      this.nomMatiere = "";
      this.descriptionMatiere = "";

    }


  }

  // detail du formateur cliqué
  currentMatiere:any;
  detailMatiere(paramMatiere: any) {
   this.currentMatiere = this.tabMatiere.find((item:any)=> item.idMatiere==paramMatiere)
   console.log(this.currentMatiere);
  }


  // Désactiver un formateur
  supprimer(paramFormateur: any){
    Swal.fire({
      title: "Voulez vous vraiment supprimer ce formateur?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonColor: "#4aa3a2",
      cancelButtonColor: "#F9968B",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramFormateur.etatFormateur=0;
        localStorage.setItem("formateurs",JSON.stringify(this.tabMatiere));
        
        this.verifInfos("Supprimer!", "", "success");
      }
    });

  }

    // Désactiver un formateur
  activer(paramFormateur: any){
    Swal.fire({
      title: "Voulez vous vraiment supprimer ce formateur?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonColor: "#4aa3a2",
      cancelButtonColor: "#F9968B",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramFormateur.etatFormateur=1;
        localStorage.setItem("formateurs",JSON.stringify(this.tabMatiere));
        
        this.verifInfos("Activer!", "", "success");
      }
    });

  }

  verifInfos(title: any, text: any, icon: any){
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  }





  
}
