import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages = 0;
  @Output() loadPage = new EventEmitter();
  pages: number[];
  crtPage = 1;

  constructor() { }

  ngOnChanges() {
    let pageCount = this.totalPages;
    if (this.totalPages > 0) {
      let index = 1;
      this.pages = [];
      this.crtPage = 1;
      while (pageCount-- > 0) {
        this.pages.push(index++);
      }
    }
  }

  ngOnInit() {
  }

  goToPage(page, previousFlag: boolean = false, nextFlag: boolean = false): void {
    this.crtPage = page;
    if (previousFlag) {
      this.crtPage = this.crtPage > 1 ? --this.crtPage : this.crtPage;
    }

    if (nextFlag) {
      this.crtPage = this.crtPage < this.totalPages ? ++this.crtPage : this.crtPage;
    }
    this.loadPage.emit(this.crtPage);
  }
}
