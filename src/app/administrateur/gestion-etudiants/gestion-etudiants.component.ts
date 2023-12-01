import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Apprenants } from 'src/app/models/etudiant';

@Component({
  selector: 'app-gestion-etudiants',
  templateUrl: './gestion-etudiants.component.html',
  styleUrls: ['./gestion-etudiants.component.css']
})
export class GestionEtudiantsComponent {
  // Méthode pour changer le contenu principale 
  selectedNavItem: string = 'apprenants';
  changeNavItem(item: string): void {
    this.selectedNavItem = item;
  }

  // Gestion bouton(pour changer la couleur de l'element active)
  boutonActif = 1;

  // Déclaration du tableau pour ajouter les apprenants
  apprenants: Apprenants[] = [];

  // Déclaration du tableau pour récuperer les classes
  db: any;
  
  //variable pour recuperer les données 
  valeur: string = "";
  image: string = "";
  password: string = "";
  email: string = "";
  prenom: string = "";
  name: string = "";

  // Appel de la methode ngOnInit de l'interface oninit 
  ngOnInit() {
    // console.log(this.users);
    if (!localStorage.getItem("Apprenants")) {
      localStorage.setItem("Apprenants", JSON.stringify(this.apprenants));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabApprenants = JSON.parse(localStorage.getItem("Apprenants") || "[]");
    console.log(this.tabApprenants);

    // Renvoie un tableau de valeurs ou un tableau vide 
    this.db = JSON.parse(localStorage.getItem("Classes") || "[]");
    console.warn(this.db);

  }

  // Notre tableau d'objets Apprenants récupéré à partir du localstorage
  tabApprenants: any;
  idLastApprenant: number = 0;


  // Méthode pour afficher un sweetalert2 apres vérification 
  sweet(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }

  // Methode pour valider l'ajout de l'apprenants
  ajoutApprenantsValider() {
    // alert(this.prenom);
    // alert(this.name);
    // alert(this.email);
    // alert(this.password);
    // alert(this.valeur);
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    if (this.name == "" || this.prenom == "" || this.email == "" || this.password == "" || this.image == "" || this.valeur == "") {
      this.sweet("error", "Erreur!", "Vueillez renseigner les champs");
    } else if (!this.email.match(emailPattern)) {
      this.sweet("error", "Erreur!", "Email invalide");
    } else {
      // On vérifie si le tableau n'est pas vide 
      if (this.tabApprenants.length) {
        console.warn("taille du tab");
        this.idLastApprenant = this.tabApprenants[this.tabApprenants.length - 1].idApprenant;
        console.log(this.idLastApprenant)
      }
      else {
        this.idLastApprenant = 0;
        console.warn("idLastUser = 0")
      }
      // Création de l'objet apprenant
      let apprenant = {
        idApprenant: this.idLastApprenant + 1,
        nomApprenant: this.name,
        prenomApprenant: this.prenom,
        emailApprenant: this.email,
        passwordApprenant: this.password,
        imageApprenant: this.image,
        etatApprenant: 1,
        anneeScolaire: new Date(),
        role: 'apprenant',
        niveau:this.valeur,
      }
      this.tabApprenants.push(apprenant);
      localStorage.setItem("Apprenants", JSON.stringify(this.tabApprenants));
      this.sweet('success', 'Felicitation!', 'Ajout Classe reuissie');
      this.name = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.image = '';
      this.valeur = '';
    }

  }

  //variable pour recuperer l'apprenant selectioner
  currentApprenant: any;
  details(paramApprenant:any) {
    // On récupère l'apprenant qui a été selectioner
    this.currentApprenant = this.tabApprenants.find((element: any) => element.idApprenant == paramApprenant);
  }

  // Methode desactiver apprenants
  Desactiver(paramApprenant: any) {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "voulez-vous desactiver",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD99BB",
      cancelButtonColor: "#F2D4CC",
      confirmButtonText: "Oui !"
    }).then((result) => {
      if (result.isConfirmed) {
        paramApprenant.etatApprenant = 0;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Apprenants", JSON.stringify(this.tabApprenants));
        this.sweet("success", "Désactiver", "Apprenant Désactiver")
      }
    });
  }

  // Methode activer apprenants
  activer(paramApprenant: any) {
    Swal.fire({
      title: "Etes-vous sur???",
      text: "voulez-vous activer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD99BB",
      cancelButtonColor: "#F2D4CC",
      confirmButtonText: "Oui!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramApprenant.etatApprenant = 1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Apprenants", JSON.stringify(this.tabApprenants));
        this.sweet("success", "Activer", "Apprenant Activer")
      }
    });
  }
}
