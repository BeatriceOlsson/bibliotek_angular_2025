import { Component, inject, Input, signal, ViewEncapsulation } from '@angular/core';
import { Book, BooksService } from '../../service/books.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-book',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './latest-book.component.html',
  styleUrl: './latest-book.component.css',
  // Prevent styles from being scoped to this component only
  encapsulation: ViewEncapsulation.None
})
export class LatestBookComponent {
  @Input() btClass: string = '';

  // Using Angular's signal to manage state
  books = signal<Book[]>([]);
  router = inject(Router);
  booksService = inject(BooksService);

  constructor() {
    this.booksService.getBooks().subscribe(data => {
      this.books.set(data);
    });
  }

  latestBook() {
    // Sort books by creation date in descending order and get the latest one
    const latest = [...this.books()].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    // Navigate to the detail page of the latest book
    if (latest) {
      this.router.navigate(['app-book-ditail', latest.id]);
    };
  }
}
