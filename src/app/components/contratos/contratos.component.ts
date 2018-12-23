import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UploadimagenService } from '../../services/uploadimagen.service';
import { Global } from '../../services/global';
import { Contrato } from '../../models/contrato.model';
import { ContratoService } from '../../services/contrato.service';
import {saveAs} from 'file-saver';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contrato: Contrato = new Contrato();
  delContrato: Contrato = new Contrato();
  user: User = new User();
  contratos: Contrato[] = [];
  contratoName: String;
  contContrato: number;
  contratoFile: any;
  modificado: Boolean;
  idContratoDel: String;
  url: String;
  usoTitle: String;
  usoDesc: String;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private contratoService: ContratoService,
    private uploadContrato: UploadimagenService,
    private modalService: NgbModal,
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/contratos');
      this.getMisContratos();
    }
      
    else
      this.router.navigateByUrl('/login');
  }

  onSubmit(form: NgForm){
    if (this.contrato._id == null) {
      this.contrato.idowner = localStorage.getItem('idus');
      this.contratoService.saveContrato(this.contrato).subscribe(
        res => {
          console.log(this.contrato);
          this.uploadContrato.makeFileRequest(this.url+"updateFileContrato/"+res.contrato._id,[],this.contratoFile,'contrato')
          .then((result:any) => {
            //console.log(result);
            this.updateContContrato("suma");
            this.showSucessMessage = true;
            this.getMisContratos();
            setTimeout(() => this.showSucessMessage = false, 4000);
          });
          this.resetForm(form);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.contratoService.updateContrato(this.contrato).subscribe(
        res => {
          this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  download(contrato: Contrato){
    var idcontrato: String = contrato.contrato;
    console.log(contrato.contrato);
    this.contratoService.downloadContrato(idcontrato).subscribe(
      data => {
        saveAs(data,idcontrato);
      },
      error => {
        console.log(error);
      }

    );
  }

  getMisContratos(){
    this.contratoService.getUserContratos(localStorage.getItem('idus')).subscribe(
      response => {
        if(response.resultado)
          this.contratos = response.resultado;
        else
          this.contratos = null;
        
        console.log(this.contratos);
      },
      error => {
        console.log(error);
      }
    )
  }

  resetForm(form){
    form.resetForm();
    this.getMisContratos();
  }

  fileChangeEvent(file){
    this.contratoFile = <Array<File>>file.target.files;
    this.contratoName = file.target.files[0].name;
  }

  editarC(contrato: Contrato){
    this.modificado = true;
    this.contrato = contrato;
  }

  eliminarC(uso){
    this.contratoService.getContrato(this.idContratoDel).subscribe(
      response => {
        this.delContrato = response.resultado;
        if(response.resultado) {
          this.contratoService.deleteContrato(this.idContratoDel).subscribe(
            response => {
              this.updateContContrato("resta");
              this.usoTitle = "Contrato eliminado";
              this.usoDesc = "El contrato ha sido eliminado correctamente.";
              this.modalService.open(uso);
              this.getMisContratos();
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

  openCancelModal(content, contrato:Contrato){
    this.idContratoDel = contrato._id;
    this.modalService.open(content);
  }

  cancelmodify(){
    this.modificado = false;
  }

  updateContContrato(opc){
    this.userService.getInfoUser(localStorage.getItem('idus')).subscribe(
        response => {
          this.user = response.resultado;
          if (opc === "suma")
            this.user.contratos++;
          else if (opc === "resta")
            this.user.contratos--;
          this.userService.updateUser(this.user).subscribe(
            response => {

            },
            error => {
              console.log(error);
            }
          );
        }      
    );
  }

}
