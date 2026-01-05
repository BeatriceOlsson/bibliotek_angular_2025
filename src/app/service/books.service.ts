import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

//Book interface definition
export interface Book {
  id: string | number,
  title: string,
  author: string,
  opinion: number,
  published: string,
  createdAt: string,
  image: string[],
  link: string,
  description: string,
  text: string,
}

//Service to get data from db.json
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  //Gets data from db.json. Needs to be running to be function properly.
  getBooks() {
    return this.http.get<{books:Book[]}>('assets/db.json')
    .pipe(map(response => response.books));
  }

  addBook(bookData: FormData): Observable<any> {
    return this.http.post('/api/books', bookData);
  }
}
