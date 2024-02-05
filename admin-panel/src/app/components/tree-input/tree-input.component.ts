import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@components/base/base.component';
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  forwardRef,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-tree-input',
  templateUrl: './tree-input.component.html',
  styleUrls: ['./tree-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeInputComponent),
      multi: true,
    },
  ],
})
export class TreeInputComponent
  extends BaseComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  show = false;
  selectedNode: any = null;

  private _nodeData: any[] = [];
  @Input()
  set nodeData(value) {
    if (value) {
      this._nodeData = value;
    }
  }
  get nodeData() {
    return this._nodeData;
  }

  @Input() bindValue = null;
  @Input() bindLabel = 'name';
  @Input() bindChildren = 'children';
  @Input() placeholder = 'Select';
  @Input() isAdmin;

  // tslint:disable-next-line: variable-name
  private _selectedValue = null;
  get selectedValue() {
    return this._selectedValue;
  }
  @Input()
  set selectedValue(value: any) {
    this._selectedValue = value;
    this.propagateChange(value);
  }
  get valueFromNode() {
    return this.bindValue
      ? this.selectedNode[this.bindValue]
      : this.selectedNode;
  }
  selectEmitter = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();
  propagateChange = (_: any) => {};
  propagateTouch = (_?: any) => {};

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.selectEmitter
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.handleSelection.bind(this));
  }
  ngOnChanges() {
    this.cdr.detectChanges();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      if (value !== this.selectedValue) {
        this.selectedValue = value;
      } else {
      }
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouch = fn;
  }

  public onToggle(): void {
    if (this.isAdmin) {
      this.propagateTouch();
      this.show = !this.show;
    }
  }

  public onBlur() {
    this.show = false;
  }

  public handleSelection(node: any): void {
    this.show = false;
    this.selectedNode = node;
    this.selectedValue = this.valueFromNode;
    this.onSelect.emit(this.selectedValue);
  }
}
