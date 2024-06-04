import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeInputComponent } from './tree-input.component';

import { TreeNodeComponent } from '@components/tree-node/tree-node.component';


@NgModule({
  declarations: [TreeInputComponent, TreeNodeComponent],
  imports: [
    CommonModule,
    NgSelectModule,
  ],
  exports: [
    TreeInputComponent,
  ]
})
export class TreeInputModule { }
