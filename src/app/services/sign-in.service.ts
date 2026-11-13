import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignInService {

  readonly dni_url: string = 'https://api.migo.pe/api/v1/dni';


  constructor(private http: HttpClient) { }

  getDataDni(dniParam: string) {
    let data = {
      token: 'yQoAsxtOYxhPN7DVg0ckFOdRm7Mb7Uqto0gGDKP6HtfXyRkyhn6WswvkjDM3',
      dni: dniParam,
    };

    return this.http.post(this.dni_url,data);
  }


}
