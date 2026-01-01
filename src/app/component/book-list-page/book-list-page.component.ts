import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService, Book } from '../../service/books.service';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  providers: [BooksService],
  templateUrl: './book-list-page.component.html',
  styleUrl: './book-list-page.component.css'
})
export class BookListPageComponent {
  letters: string[] = [];
  // Object to hold books grouped by their starting letter
  groupedBooks: { [letter: string]: Book[] } = {};

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    // Initialize letters A-Z including Å, Ä, Ö
    const base = [...'ABCDEFGHIJKLMNOPQRSTUVXYZ'];
    this.letters = [...base, 'Å', 'Ä', 'Ö'];
    this.fetchBook();
  }

  fetchBook() {
    this.booksService.getBooks().subscribe((data) => {
      this.groupedBooks = data.reduce((acc, book) => {
        // Changes first letter to uppercase to ensure consistency
        const firstLetter = book.title[0].toUpperCase();

        // Initialize the array for this letter if it doesn't exist
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(book);
        return acc;
      },
        // Initialize accumulator as an empty object
        {} as { [letter: string]: Book[] });

      // Ensure all letters are represented in groupedBooks
      for (const letter of this.letters) {
        if (!this.groupedBooks[letter]) {
          this.groupedBooks[letter] = [];
        }
      }
    });
  }

}
