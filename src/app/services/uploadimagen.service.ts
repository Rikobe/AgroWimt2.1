import { Injectable } from '@angular/core';
import { Global } from './global';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UploadimagenService {
  public url: String;
  constructor(  ) {
    this.url = Global.url;
  }

  makeFileRequest(url: string, params: Array<String>, files: Array<File>, name: string){
    return new Promise(function(resolve, reject){
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i],files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }
          else{
            console.log("Entró aquí");
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST',url,true);
      xhr.send(formData);
    });
  }
}
