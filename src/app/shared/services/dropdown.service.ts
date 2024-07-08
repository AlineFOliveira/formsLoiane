import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  public getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json') .pipe(//ué 
      map(res=> res)
    );
  }
}
