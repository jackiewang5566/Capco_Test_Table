import { Component, OnInit, Inject } from '@angular/core';
import { Data } from 'src/app/data-structure/data';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.sass']
})
export class CustomTableComponent implements OnInit {
  tableData: Data[] = [];
  currentPageData: Data[] = [];

  // table header
  tableHeaderTitle: string[] = [];

  // table page 
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: Array<number> = [5, 10, 15, 20, 25, 50, 100];
  totalPages: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe((sample_data: Data[]) => {
      this.tableData = sample_data;
      this.setupTableConfig();
    });
  }

  setupTableConfig() {
    console.log(this.pageSize);
    const pageStartIndex = this.pageIndex * this.pageSize;
    const pageEndIndex = pageStartIndex + this.pageSize;
    this.currentPageData = this.tableData.slice(pageStartIndex, pageEndIndex);
    this.totalPages = this.tableData.length / this.pageSize + this.tableData.length % this.pageSize !== 0 ? 1 : 0;

    if (this.tableData.length > 0 && this.tableHeaderTitle.length === 0) {
      Object.keys(this.tableData[0]).forEach((headerTitle) => {
        this.tableHeaderTitle.push(headerTitle);
      })
    } 
  }

  changePageSize() {
    this.setupTableConfig();
  }

}
