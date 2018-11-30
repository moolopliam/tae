import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  URL:string ="http://chapayom.codehansa.com/crud_person.php?";
  constructor(private http: HttpClient) { }

  GetPerson(){
    return this.http.get<Person[]>(this.URL+"cmd=select");
  }

  getOneProduct(personID) {
    return this.http.get<Person[]>(this.URL + "cmd=select&personID=" + personID);
  }

  CreatePersonl(data)
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
