import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms"; 
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../models/recursos.model';
import { UserService } from '../../shared/user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agrmodrecursos',
  templateUrl: './agrmodrecursos.component.html',
  styleUrls: ['./agrmodrecursos.component.css']
})
export class AgrmodrecursosComponent implements OnInit {
  mirecurso: Recurso = new Recurso();
  delRecurso: Recurso = new Recurso();
  recursos: Recurso[] = [];
  messageSuccess: String;
  messageError: String;
  idRecursoDel: String;
  usoTitle: String;
  usoDesc: String;
  constructor(
    private userService: UserService,
    private _recursoService: RecursosService,
    private router : Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/administrarrecursos');
      this.getUserRecursos();
    }
    else
     this.router.navigateByUrl('/login');
  }

  getUserRecursos(){
    this._recursoService.getRecursos().subscribe(
      response => {
        if (response.resultado){
          this.recursos = response.resultado;
        }
        else{
          this.recursos = null;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form: NgForm){
    if (this.mirecurso._id == null){
      this.mirecurso.idowner = localStorage.getItem('idus');
      console.log(this.mirecurso);
      this._recursoService.postRecurso(this.mirecurso).subscribe(
        res => {
          this.messageSuccess = "El recurso se registro correctamente.";
          this.resetForm(form);
          this.getUserRecursos();
          setTimeout(() => this.messageSuccess = null, 3000);
        },
        error => {
          this.messageError = "No pudo registrarse su recurso. Contacte con el administrador.";
          setTimeout(() => this.messageError = null, 3000);
          console.log(error);
        }
      );
    }
    else {

    }
  }

  resetForm(form: NgForm){
    form.resetForm();
  }

  editarR(recurso: Recurso){
    this.mirecurso = recurso;
  }

  eliminarR(uso){
    this._recursoService.getRecurso(this.idRecursoDel).subscribe(
      response => {
        this.delRecurso = response.resultado;
        if(response.resultado) {
          this._recursoService.deleteRecurso(this.idRecursoDel).subscribe(
            response => {
              this.usoTitle = "Recurso eliminado";
              this.usoDesc = "El recurso ha sido eliminado correctamente.";
              this.modalService.open(uso);
              this.getUserRecursos();
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openCancelModal(content, recurso: Recurso){
    this.idRecursoDel = recurso._id;
    this.modalService.open(content);
  }

}
