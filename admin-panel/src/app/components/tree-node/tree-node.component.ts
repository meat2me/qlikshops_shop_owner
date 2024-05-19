import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent implements OnInit {
  private _selectedValue: any = null;
  get selectedValue() {
    return this._selectedValue;
  }

  @Input()
  set selectedValue(value) {
    if (value !== null) {
      this._selectedValue = value;
      if (this.isSelected) {
        this.setInitNode.emit(this.nodeData);
      }
    }
  }
  @Input() nodeData: any = null;
  @Input() bindLabel = 'label';
  @Input() bindValue = null;
  @Input() bindChildren = 'children';
  @Input() level = 1;
  @Input() paddingStep = 10; // in px
  @Input() selectEmitter = new EventEmitter();
  @Input() selectedNode: any = null;
  @Input()
  @Output()
  setInitNode = new EventEmitter<any>(true);

  leftStyle = { 'padding-left.px': 0 };
  rightStyle = { 'padding-right.px': 0 };

  get isSelected() {
    if (this.bindValue) {
      return (
        this.nodeData && this.nodeData[this.bindValue] === this.selectedValue
      );
    }

    return (
      this.nodeData &&
      this.selectedValue &&
      this.nodeData === this.selectedValue
    );
  }

  constructor(private langServ: LanguageService) {}

  ngOnInit(): void {
    this.leftStyle['padding-left.px'] = this.rightStyle['padding-right.px'] =
      this.level * this.paddingStep;
  }

  get isRTL() {
    return this.langServ.isRtl;
  }
}
