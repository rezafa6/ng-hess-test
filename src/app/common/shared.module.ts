import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { ColDefDirective } from "./directives/col-def.directive";
import { SearchFilterPipe } from "./pipes/search-filter.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe,
    TranslateDirective,
    NzIconModule,
    NzPipesModule,
    NzSwitchModule,
    ColDefDirective,
    SearchFilterPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe,
    TranslateDirective,
    NzIconModule,
    NzSwitchModule,
    SearchFilterPipe
  ],
})
export class SharedModule {}
