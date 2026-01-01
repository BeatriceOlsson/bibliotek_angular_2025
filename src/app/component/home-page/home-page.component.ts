import { Component, signal } from '@angular/core';
import { Book, BooksService } from '../../service/books.service';
import { CommonModule } from '@angular/common';
import { ImageSwitchComponent } from '../image-switch/image-switch.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ImageSwitchComponent, RouterLink],
  providers: [BooksService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // signal to manage the collapse state of book descriptions
  textCollapse = signal<Set<number>>(new Set);
  // signal to hold the list of books
  books = signal<Book[]>([]);

  // method to toggle the collapse state of a book description
  discriptionBook(index: number) {
    this.textCollapse.update(set => {
      const newSet = new Set(set);

      // Toggle the presence of the index in the set
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    })
  }

  // method to check if a book description is expanded
  textExpend(index: number): boolean {
    return this.textCollapse().has(index);
  }

  constructor(private booksService: BooksService) { this.fetchBook(); }
  // method to fetch books and set the latest
  fetchBook() {
    this.booksService.getBooks().subscribe((data) => {
      const sortedData = [...data].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Get the latest number of books
      const latestTow = sortedData.slice(0, 4);
      this.books.set(latestTow);
    });
  }


}
