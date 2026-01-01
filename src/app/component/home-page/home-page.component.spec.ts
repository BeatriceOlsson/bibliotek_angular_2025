import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { Book, BooksService } from '../../service/books.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let server : BooksService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, HttpTestingController],
      providers: [BooksService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    server = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
    //textExpand = TestBed.inject(HomePageComponent);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Shuld show latest added book', () => {
    const bookMocks: Book[] = [
      {
        id: 1, title: 'Book A', author: 'Author A', opinion: 5,
        published: '2023-05-01', createdAt: '2023-05-01T10:00:00Z',
        image: [], link: '', description: '', text: ''
      },
      {
        id: 2, title: 'Book B', author: 'Author B', opinion: 7,
        published: '2024-06-15', createdAt: '2024-06-15T10:00:00Z',
        image: [], link: '', description: '', text: ''
      }
    ];

    server.getBooks().subscribe((books) => {
      const sorted = [...books].sort((a,b) =>
      new Date(b.published).getTime() - new Date(a.published).getTime()
    );
    expect(books).toEqual(sorted);
    });

    const req = httpMock.expectOne('http://localhost:3001/books');
    expect(req.request.method).toBe('GET');
    req.flush(bookMocks);
  })

  /*it('shuld colaps text', () => {
    const collapse: boolean= (true);

    fixture.textExband()
  })*/

});
