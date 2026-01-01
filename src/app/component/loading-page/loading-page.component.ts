import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit, OnDestroy {
  /** Delay in milliseconds before the loading animation appears. Set to 0 to show immediately. */
  @Input() delay = 600;

  /** Controls whether the loader content is shown. Parent can keep the component in the DOM and this component will decide when to render its animation. */
  show = false;

  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!this.delay || this.delay <= 0) {
      this.show = true;
      return;
    }
    this.timer = setTimeout(() => {
      this.show = true;
      this.timer = null;
    }, this.delay);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
