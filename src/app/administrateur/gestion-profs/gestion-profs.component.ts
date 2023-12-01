import { AfterViewInit, Component } from '@angular/core';
import { Professeurs } from 'src/app/models/professeur';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-profs',
  templateUrl: './gestion-profs.component.html',
  styleUrls: ['./gestion-profs.component.css']
})
export class GestionProfsComponent {

  // Gestion bouton
  boutonActif = 1;
  formateurFound: any;

  currentContent: string = 'listeFormateurs'; // Initialiser le contenu actuel

  showContent(contentId: string): void {
    this.currentContent = contentId; // Mettre à jour le contenu actuel
  }

  // Initialisation du contenu actuel

  // Déclaration du tableau pour ajouter les apprenants
  formateurs: Professeurs[] = [];

  // Déclaration du tableau pour récuperer les classes
  db: any;
  dbMatiere: any;
  
  // Attributs du formateurs
 
  nomFormateur: string = "";
  prenomFormateur: string = "";
  passwordFormateur: string = "";
  urlProfileFormateur: string = "";
  emailFormateur: string = "";
  descriptionFormateur: string = "";
  classeFormateur: string = "";
  matieresFormateur: string = "";

  // Appel de la methode ngOnInit de l'interface oninit 
  ngOnInit() {
    // console.log(this.users);
    if (!localStorage.getItem("formateurs")) {
      localStorage.setItem("formateurs", JSON.stringify(this.formateurs));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabFormateur = JSON.parse(localStorage.getItem("formateurs") || "[]");
    console.log(this.tabFormateur);

    this.db = JSON.parse(localStorage.getItem("Classes") || "[]");
    console.warn(this.db);


    this.formateurFound = this.tabFormateur[this.idLastFormateur-1];
    console.log(this.formateurFound);

    this.dbMatiere = JSON.parse(localStorage.getItem("matieres") || "[]");
    console.log(this.dbMatiere);

  }

  // Notre tableau d'objets classes récupéré à partir du localstorage
 
  tabFormateur: any;
  idLastFormateur: number = 0;

  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }


  // Methode pour valider l'ajout du formateur

  ajoutFormateur() {
    // Phase de test
    // alert(this.prenomFormateur);
    // alert(this.nomFormateur);
    // alert(this.emailFormateur);
    // alert(this.passwordFormateur);
    // alert(this.urlProfileFormateur);
    // alert(this.descriptionFormateur);
    // alert(this.classeFormateur);
    // alert(this.matieresFormateur);

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Validation

    if(this.prenomFormateur == "" || 
      this.nomFormateur == "" || 
      this.emailFormateur == "" || 
      this.passwordFormateur == "" || 
      this.urlProfileFormateur == "" ||
      this.descriptionFormateur == "" ||
      this.classeFormateur == "" ||
      this.matieresFormateur == "") {
        this.sweet('error','Attention','Tous les champs doivent etre renseigner')
    }else if(!this.emailFormateur.match(emailPattern)){
      this.sweet("error","Attention","L\'email n\'est pas valide")
    }else {
      if (this.tabFormateur.length) {
        console.warn("taille du tab");
        this.idLastFormateur = this.tabFormateur[this.tabFormateur.length - 1].idFormateur;
        console.log(this.idLastFormateur)
      }else{
        this.idLastFormateur = 0
        console.log(this.idLastFormateur);
      }

      // Objet formateur
        let formateur = {
          idFormateur: this.idLastFormateur + 1,
          prenomF: this.prenomFormateur,
          nomF: this.nomFormateur,
          emailF: this.emailFormateur,
          passwordF: this.passwordFormateur,
          urlProfilF: this.urlProfileFormateur,
          descriptF: this.descriptionFormateur,
          classeF: this.classeFormateur,
          matiereF: this.matieresFormateur,
          etatFormateur: 1,
          evaluation:[]
        }

        // Ajout de l'objet formateur
        this.tabFormateur.push(formateur);

        localStorage.setItem("formateurs", JSON.stringify(this.tabFormateur));

        // Message d'ajout
        this.sweet("success","Super","Formateur ajouté avec succès")

      console.log(this.tabFormateur.idFormateur);
      this.nomFormateur= "";
      this.prenomFormateur= "";
      this.passwordFormateur= "";
      this.urlProfileFormateur= "";
      this.emailFormateur= "";
      this.descriptionFormateur= "";
      this.classeFormateur= "";
      this.matieresFormateur= "";

    }

  }

  // detail du formateur cliqué
  currentFormateur:any;
  detailFormt(paramFormateur: any) {
   this.currentFormateur = this.tabFormateur.find((item:any)=> item.idFormateur==paramFormateur)
   console.log(this.currentFormateur);
  }


  // Désactiver un formateur
  supprimer(paramFormateur: any){
    Swal.fire({
      title: "Voulez vous vraiment supprimer ce formateur?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonColor: "#DD99BB",
      cancelButtonColor: "#DD99BB",
      confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramFormateur.etatFormateur=0;
        localStorage.setItem("formateurs",JSON.stringify(this.tabFormateur));
        
        this.verifInfos("Supprimer!", "", "success");
      }
    });

  }

    // Désactiver un formateur
  activer(paramFormateur: any){
    Swal.fire({
      title: "Voulez vous vraiment activer ce formateur?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonColor: "#DD99BB",
      cancelButtonColor: "#DD99BB",
      confirmButtonText: "Oui, activer!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramFormateur.etatFormateur=1;
        localStorage.setItem("formateurs",JSON.stringify(this.tabFormateur));
        
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
  




