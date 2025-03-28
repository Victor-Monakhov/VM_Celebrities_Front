import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environment';
import { ICelebrity } from '../interfaces/celebrities.interface';

@Injectable({
  providedIn: 'root',
})
export class CelebritiesService {

  private readonly http = inject(HttpClient);
  private url = environment.apiURL;

  public getAllCelebrities(isReset: boolean): Observable<ICelebrity[]> {
    return this.http.get<ICelebrity[]>(`${this.url}all?reset=${isReset}`);
  }

  public removeCelebrity(id: number): Observable<ICelebrity[]> {
    return this.http.delete<ICelebrity[]>(`${this.url}delete/${id}`);
  }

  public searchCelebrity(name: string): Observable<ICelebrity[]> {
    return this.http.get<ICelebrity[]>(`${this.url}search?name=${name}`);
  }

  public editCelebrity(celebrity: ICelebrity): Observable<ICelebrity[]> {
    return this.http.put<ICelebrity[]>(`${this.url}update/${celebrity.id}`, celebrity);
  }

  public addCelebrity(celebrity: ICelebrity): Observable<ICelebrity[]> {
    return this.http.post<ICelebrity[]>(`${this.url}add`, celebrity);
  }
}
