import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Book, BooksService } from '../../service/books.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-latest-book',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './latest-book.component.html',
  styleUrls:  ['./latest-book.component.css'],
  // Prevent styles from being scoped to this component only
  encapsulation: ViewEncapsulation.None
})
export class LatestBookComponent {
  @Input() btClass = '';
  private sub = new Subscription();
  books: Book[] = [];

  constructor(private booksService: BooksService, private router: Router) {
    this.sub.add(this.booksService.getBooks().subscribe(list => this.books = list || []));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  

  latestBook() {
    const latest = [...this.books].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    if (!latest) return;
    
      this.router.navigate(['app-book-ditail', latest.id]);
    };
  
}
