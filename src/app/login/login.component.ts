import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { Users } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Utilisateur trouvé 
  userApprenantFound: any;
  userAdminFound: any;
  userFormateurFound: any;

  // Déclaration du tableau pour récuperer les Apprenants et les formateurs
  dbApprenants: any;
  dbFormateurs: any;


  // Notre tableau tabAdmin
  tabAdmin: Users[] = [];

  
  // autres tableaux
  tabUsers: any;
  currentUser: any;



  // Notre constructeur
  constructor(private route: Router){}

  // Nos attributs

  emailLogin: string = "";
  passwordLogin: string = "";


  // Méthode d'initialisation
  ngOnInit() {
    if (!localStorage.getItem("tabAdmin")) {
      localStorage.setItem("tabAdmin", JSON.stringify(this.tabAdmin));
    }

    this.tabAdmin = JSON.parse(localStorage.getItem("tabAdmin") || '[]');

    // Renvoie un tableau de valuers ou un tableau vide 
    this.dbApprenants = JSON.parse(localStorage.getItem("Apprenants") || "[]");
    console.log(this.dbApprenants);

    this.dbFormateurs = JSON.parse(localStorage.getItem("formateurs") || "[]");
    console.log(this.dbFormateurs);

    // Notre objet compteAdmin
    let compteAdmin = {
      emailAdminLogin : 'admin@gmail.com',
      passwordAdminLogin: '12345',
    }

    this.tabAdmin.push(compteAdmin)
  }

  



  // Nos méthodes

  connexion(){
    // alert(this.emailLogin);
    // alert(this.passwordLogin);

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if(this.emailLogin == "" || this.passwordLogin == "" ){
      this.alertMessage("error", "Attention", "Veillez renseigner tous les champs", timer);
    }else if(!this.emailLogin.match(emailPattern)){
      this.alertMessage("error", "Attention", "Veillez revoir votre email", timer);
    }else if(this.passwordLogin.length < 5){
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres", timer);
    }else{
      this.userAdminFound = this.tabAdmin.find((element: any) => element.emailAdminLogin == this.emailLogin && element.passwordAdminLogin == this.passwordLogin);
      this.userApprenantFound = this.dbApprenants.find((element: any) => element.emailApprenant == this.emailLogin && element.passwordApprenant == this.passwordLogin && element.etatApprenant == 1);
      this.userFormateurFound = this.dbFormateurs.find((element: any) => element.emailF == this.emailLogin && element.passwordF == this.passwordLogin && element.etatFormateur == 1);
      if (this.userApprenantFound) {
        this.alertMessage("success", "Bravo", "Vous etes connecté avec succés", timer);
        this.route.navigate(['etudiant', this.userApprenantFound.idApprenant]);
      }else if (this.userAdminFound) { 
        this.alertMessage("success", "Bravo", "Vous etes connecté avec succés", timer);
        this.route.navigate(['admin']);
      } else if (this.userFormateurFound) {
        this.alertMessage("success", "Bravo", "Vous etes connecté avec succés", timer);
        this.route.navigate(['formateur',this.userFormateurFound.idFormateur]);
      } 
      else {
        this.alertMessage("error", "Oups!", "Le compte n'exite pas ou est désactiver", timer);
      }
    } 

    }


  // sweetAlert
  alertMessage(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 1500
    });
  }
}
