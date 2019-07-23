import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Data } from 'src/app/data-structure/data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('tableData') tableData: Data[] = [];
  @Input('totalPages') totalPages: number = 0;
  pages: number[];

  constructor() { }

  ngOnChanges() {
    if (this.totalPages > 0) {
      let index = 1;
      this.pages = [];
      while (this.totalPages-- > 0) {
        this.pages.push(index++);
      }
    }
  }

  ngOnInit() {
  }

  goToPage() {

  }
}
