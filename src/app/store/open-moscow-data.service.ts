import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LibraryInfo} from './open-moscow-data.model';

@Injectable({
  providedIn: 'root'
})
export class OpenMoscowDataService {
  private readonly _URL = 'https://apidata.mos.ru';

  constructor(private _http: HttpClient) {}

  getLibraryTable$(): Observable<LibraryInfo[]>  {
    const params = new HttpParams().set('api_key', 'da8ec520-338b-4989-b843-a3a5b3ea55b5');

    return this._http.get<LibraryInfo[]>(`${this._URL}/v1/datasets/526/rows`, {params})
  }
}
