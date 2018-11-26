import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UploadimagenService } from '../../services/uploadimagen.service';
import { Global } from '../../services/global';
import { Contrato } from '../../models/contrato.model';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  contrato: Contrato = new Contrato();
  contratos: Contrato[] = []
  contratoName: String;
  contratoFile: any;
  url: String;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private contratoService: ContratoService,
    private uploadContrato: UploadimagenService
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/contratos');
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
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          });
          this.resetForm(form);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  resetForm(form){
    form.resetForm();
    //this.getMisContratos();
  }

  fileChangeEvent(file){
    this.contratoFile = <Array<File>>file.target.files;
    this.contratoName = file.target.files[0].name;
  }



}
