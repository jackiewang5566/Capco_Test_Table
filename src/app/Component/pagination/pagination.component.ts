import { Component, OnInit, Input } from '@angular/core';
import { Data } from 'src/app/data-structure/data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input('tableData') tableData: Data[] = [];
  @Input('totalPages') totalPages: number;

  constructor() { }

  ngOnInit() {
  }

  goToPage() {

  }
}
