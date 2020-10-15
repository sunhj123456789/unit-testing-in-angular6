import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
   data:user[]=[
    {
    name:'sundar',
    rollno:90
  },
  {
    name:'kumar',
    rollno:45
  },
  {
    name:'Raj',
    rollno:89
  }
];

getData():Observable<user[]>{
  return of(this.data);
}

}
