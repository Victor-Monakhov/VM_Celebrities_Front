import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ICelebrity } from '../interfaces/celebrities.interface';

@Injectable({
  providedIn: 'root',
})
export class CelebritiesService {

  private readonly http = inject(HttpClient);

  public getAllCelebrities(isReset: boolean): Observable<ICelebrity[]> {
    return this.http.get<ICelebrity[]>(`http://localhost:5263/api/celebrity/all?reset=${isReset}`);
  }

  public removeCelebrity(id: number): Observable<ICelebrity[]> {
    return this.http.delete<ICelebrity[]>(`http://localhost:5263/api/celebrity/delete/${id}`);
  }

  public searchCelebrity(name: string): Observable<ICelebrity[]> {
    return this.http.get<ICelebrity[]>(`http://localhost:5263/api/celebrity/search?name=${name}`);
  }

  public editCelebrity(celebrity: ICelebrity): Observable<ICelebrity[]> {
    return this.http.put<ICelebrity[]>(
      `http://localhost:5263/api/celebrity/update/${celebrity.id}`,
      celebrity,
    );
  }

  public addCelebrity(celebrity: ICelebrity): Observable<ICelebrity[]> {
    return this.http.post<ICelebrity[]>(
      `http://localhost:5263/api/celebrity/add`,
      celebrity,
    );
  }
}
