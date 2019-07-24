import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { Data } from 'src/app/data-structure/data';
import { SubmitParams } from 'src/app/data-structure/submit-params';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.sass']
})
export class CustomTableComponent implements OnInit {
  @ViewChild('tHeaderDiv') thead: ElementRef;
  tableData: Data[] = [];
  currentPageData: Data[] = [];

  // table header
  tableHeaderTitle: string[] = [];

  // table page
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: Array<number> = [5, 10, 15, 20, 25, 50, 100];
  totalPages = 0;

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
    this.pageSize = typeof this.pageSize === 'string' ? parseInt(this.pageSize, 10) : this.pageSize;
    const pageStartIndex = this.pageIndex * this.pageSize;
    const pageEndIndex = pageStartIndex + this.pageSize;
    this.currentPageData = this.tableData.slice(pageStartIndex, pageEndIndex);
    this.totalPages = Math.ceil(this.tableData.length / this.pageSize);

    if (this.tableData.length > 0 && this.tableHeaderTitle.length === 0) {
      Object.keys(this.tableData[0]).forEach((headerTitle) => {
        this.tableHeaderTitle.push(headerTitle);
      });
    }
  }

  changePageSize() {
    this.pageIndex = 0;
    this.setupTableConfig();
  }

  goToPage(pageNum: number) {
    this.pageIndex = pageNum - 1;
    this.setupTableConfig();
  }

  submit(row: Data) {
    const params: SubmitParams = {
      id: row.id,
      status: row.status
    };
    this.dataService.postData(params).subscribe((res) => {
      alert(`${res['msg']}, id: ${row.id}, status: ${row.status}`);
    });
  }

  /**
   * syncing thead and tbody when horizontally scroll
   */
  scrollTBody(e) {
    const leftOffset = e.target.scrollLeft;
    this.thead.nativeElement.scrollLeft = leftOffset;
  }

}
