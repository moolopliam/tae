import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BMI } from '../models/bmi';
@Injectable({
  providedIn: 'root'
})
export class BMIService {

  URL:string ="http://chapayom.codehansa.com/crud_bmi.php?";
  constructor(private http: HttpClient) { }

  GetBMI(){
    return this.http.get<BMI[]>(this.URL+"cmd=select");
  }

  CreateBMI(data)
  {
    let promise = new Promise((resolve, reject) => {
      let ApiURL = this.URL + "cmd=insert";
      this.http.post(ApiURL, data)
        .toPromise()
        .then(
          res => {
            //sec
            console.log(res);
            resolve(data);
          }
        );
    });
    return promise;
  }
}
