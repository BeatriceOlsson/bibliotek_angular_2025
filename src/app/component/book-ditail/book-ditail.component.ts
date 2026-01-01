import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BooksService } from '../../service/books.service';
import { CommonModule } from '@angular/common';
import { ImageSwitchComponent } from '../image-switch/image-switch.component';
import { Subscription } from 'rxjs';
import { LoadingPageComponent } from '../loading-page/loading-page.component';

@Component({
  selector: 'app-book-ditail',
  standalone: true,
  imports: [CommonModule, ImageSwitchComponent, LoadingPageComponent],
  templateUrl: './book-ditail.component.html',
  styleUrls: ['./book-ditail.component.css']
})

export class BookDitailComponent {
  private route = inject(ActivatedRoute);
  private bookServer = inject(BooksService)
  private sub = new Subscription();

  books = signal<Book[]>([]);
   // get bookId from route params
  bookId = signal<string | null>(null);
  // find book by id from books signal
  book = computed<Book | undefined>(() => this.books().find(b => String((b as any).id) === this.bookId()));

  openLink(url: string) {
    window.open(url, '_blank', 'noopener');
  };

  constructor() {
    this.bookServer.getBooks().subscribe(data => {
      this.books.set(data);
    });

    this.sub.add(this.route.paramMap.subscribe(params => {
      this.bookId.set(params.get('id'));
    }) );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
}
}

