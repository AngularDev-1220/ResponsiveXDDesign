import { Injectable } from '@angular/core';
import { AngularFireLiteAuth, AngularFireLiteFirestore } from 'angularfire-lite';
import { Observable, Subject } from 'rxjs';
import {first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(public auth: AngularFireLiteAuth, public fs: AngularFireLiteFirestore) { }


  isAuth(): Subject<any>{
    return this.auth.isAuthenticated();
  }
  signin(email: string, pass: string): Observable<any> {
    return this.auth.signin(email, pass);
  }
  signup(email: string, pass: string): Observable<any>{
    return this.auth.signup(email, pass);
  }
  getCities(): Observable<any>{
    return this.auth.uid().pipe(switchMap((uid) => {
      return this.fs.read(`${uid}`);
    }));
  }

  addCity(name: string): Observable<any> {
    return this.auth.uid()
          .pipe(switchMap((uid) => {
            return this.fs
                        .write(`${uid}/${name}`, {name, added: new Date()})
                        .pipe(first());
          }), first());
  }
}
