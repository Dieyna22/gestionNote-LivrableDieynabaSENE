import { Component } from '@angular/core';
import { Classe } from 'src/app/models/classe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-classes',
  templateUrl: './gestion-classes.component.html',
  styleUrls: ['./gestion-classes.component.css']
})
export class GestionClassesComponent {

  // Gestion bouton
  boutonActif = 1;

  currentContent: string = 'listeFormateurs'; // Initialiser le contenu actuel
  nom: string = '';

  showContent(contentId: string): void {
    this.currentContent = contentId; // Mettre à jour le contenu actuel
  }

  // Déclaration du tableau pour ajouter les classes
  classes: Classe[] = [];

  // Déclaration de l'attribut
  nomClasse: String = "";

  // Notre tableau d'objets classes récupéré à partir du localstorage
  tabClasses: any;
  idLastClasse: number = 0;

  // Appel de la methode ngOnInit de l'interface oninit 
  ngOnInit() {
    // console.log(this.users);
    if (!localStorage.getItem("Classes")) {
      localStorage.setItem("Classes", JSON.stringify(this.classes));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabClasses = JSON.parse(localStorage.getItem("Classes") || "[]");
    console.log(this.tabClasses);
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // Methode pour valider l'ajout de classes
  ajoutClassesValider() {
    alert(this.nomClasse);

    // On vérifie si le tableau n'est pas vide 
    if (this.tabClasses.length) {
      console.warn("taille du tab");
      this.idLastClasse = this.tabClasses[this.tabClasses.length - 1].idClasse;
      console.log(this.idLastClasse)
    }
    else {
      this.idLastClasse = 0;
      console.warn("idLastClasse = 0")
    }

    // Verification du nom
    // Si le champ est remplit, on ajoute la classe dans le tableau localStorage
    if (this.nomClasse == "") {
      this.sweet('error', 'Erreur!', 'Veuillez remplir le champ');
    } else {
      let classe = {
        idClasse: this.idLastClasse + 1,
        nom: this.nomClasse,
      }
      let classeExist = this.tabClasses.find((elemt: any) => elemt.nom == this.nomClasse);

      if (classeExist) {
        this.sweet('error', 'Erreur!', 'Cette classe est déjà ajoutée');
      }
      else {
        // On crée le compte 
        this.tabClasses.push(classe);
        localStorage.setItem("Classes", JSON.stringify(this.tabClasses));
        this.sweet('success', 'Felicitation!', 'Ajout Classe reuissie');
        this.nomClasse = '';
      }
    }
  }

  // variable qui stock le Classe selectionner
  currentClasse: any;
  // Methode pour charger les infos du classe à modifier
  chargerInfosClasse(paramClasse: any) {
    this.currentClasse = paramClasse;
    this.nom = paramClasse.nom;
    console.log(this.currentClasse.nom);
  }

  modierClasse() {
    this.currentClasse.nom = this.nom;
    alert(this.currentClasse.nom);
  }

  
}
