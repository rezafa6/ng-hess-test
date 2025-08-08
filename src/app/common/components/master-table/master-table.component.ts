import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ColDefDirective } from '../../directives/col-def.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

const nzModules = [
  NzTableModule
]

@Component({
  selector: 'app-master-table',
  imports: [CommonModule, ...nzModules],
  templateUrl: './master-table.component.html',
  styleUrl: './master-table.component.scss'
})
export class MasterTableComponent implements OnInit, AfterContentInit {
  @Input() tableData: any;
  @ContentChildren(ColDefDirective) colsDef!: QueryList<ColDefDirective>;

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
