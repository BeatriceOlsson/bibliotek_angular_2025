import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BooksService, Book } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('shuld show data', (done) => {
    const mockBook: Book [] = [
      {
        "id": "1",
        "title": "Carry on, Jeeves",
        "author": "P.G.Wodehouse",
        "opinion": 9,
        "published": "2018-06-28",
        "createdAt": "2025-07-02T10:30:00Z",
        "image": [
          "assets/images/images.jpg",
          "assets/images/PGWodehouse"
        ],
        "link": "https://www.adlibris.com/se/bok/carry-on-jeeves-9781787461079?utm_source=google&utm_medium=cpc&utm_campaign=AR:+BOK+-+pMAX+Shopping+-+Generic+-+B%C3%B6cker+ENG&gad_source=1&gclid=CjwKCAiAl4a6BhBqEiwAqvrqunR3kbYFr2dknYLqwLoDqCcYzf3Acmei1hzjyEeeJ_2CGaZgqbJC_xoCZQ0QAvD_BwE",
        "description": "Hej",
        "text": " Hej"
      }
      ]
      service.getBooks().subscribe(books => {
        expect(books.length).toBe(1);
        expect(books).toEqual(mockBook);
        done();
      });

      const req = httpMock.expectOne('http://localhost:3001/books');
      expect(req.request.method).toBe('GET');
      req.flush(mockBook);
  })

  it('Shuld save book in DB', (done) => {
    const newBook: Book = {
    "id": '0',
    "title": 'Book titel',
    "author": 'Bea',
    "opinion": 10,
    "published": '2025-07-02',
    "createdAt": '2025-07-20',
    "image": [],
    "link": '',
    "description": 'Hej1',
    "text": 'Hej2',
    }
    
    // Convert Book object to FormData for addBook()
    const formData = new FormData();
    formData.append('id', String(newBook.id));
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('opinion', String(newBook.opinion));
    formData.append('published', newBook.published);
    formData.append('createdAt', newBook.createdAt);
    formData.append('link', newBook.link);
    formData.append('description', newBook.description);
    formData.append('text', newBook.text);
    
    service.addBook(formData).subscribe(book => {
      expect(book).toEqual(newBook);
      done();
    })

    const req = httpMock.expectOne('/api/books');
      expect(req.request.method).toBe('POST');
      req.flush(newBook);
  })
});
