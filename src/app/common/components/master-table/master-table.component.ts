import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, signal } from '@angular/core';
import { ColDefDirective } from '../../directives/col-def.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

const nzModules = [
  NzTableModule,
  NzInputModule,
  NzIconModule,
  NzGridModule,
  NzPaginationModule
]

@Component({
  selector: 'app-master-table',
  imports: [CommonModule, FormsModule, SearchFilterPipe, ...nzModules],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.scss'
})
export class MasterTableComponent implements OnInit, AfterContentInit {
  @Input() tableData: any;
  @Input() showSearchInput = true;
  @ContentChildren(ColDefDirective) colsDef!: QueryList<ColDefDirective>;
  searchTerm: string = '';
  templates: { [key: string]: any } = {};

  ngOnInit() {
    this.tableData.columns = this.tableData.columns.filter((column: any) => column.isShow);
  }

  ngAfterContentInit() {
    this.colsDef.forEach(col => {
      this.templates[col.colDef] = col.template;
    });
  }
}
