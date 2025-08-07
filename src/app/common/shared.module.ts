import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateDirective, TranslatePipe } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { ColDefDirective } from "./directives/col-def.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe,
    TranslateDirective,
    NzIconModule,
    NzPipesModule,
    ColDefDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipe,
    TranslateDirective,
    NzIconModule,
  ],
})
export class SharedModule {}
