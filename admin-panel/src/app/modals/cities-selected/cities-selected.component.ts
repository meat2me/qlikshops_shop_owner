import { ErrorResp } from '@models/resp.model';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild, AfterViewInit, ChangeDetectorRef
} from '@angular/core';
import { AlertService } from '@services/alert.service';
import { LanguageService } from '@services/language.service';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment/moment';
import {translate} from '@angular/localize/src/utils';
import {TranslateService} from '@ngx-translate/core';

type CityItem = {
  item_id: number;
  item_text: string;
};

type hour = {
  hour: '00',
  minute: '00',
  second: 0,
};

@Component({
  selector: 'app-city-selected',
  templateUrl: './cities-selected.component.html',
  styleUrls: ['./cities-selected.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CitiesSelectedComponent implements OnInit , AfterViewInit{
  dropdownList = [];
  selectedItems = [];
  parsItems: any;
  parsTime: any;
  dropdownSettings = {};
  formGroup: FormGroup;
  allCities: CityItem [];
  citiesSelected: any;
  private data: any;
  general_from_time: hour;
  isTimepickerEnabled = false;


  private _dataEdit: boolean;
  private multiSelect: any;
   ngOnInit() {
    this.dropdownList = this.allCities;
    this.parsItems = this.parsItems.split('\n');
    if (this.parsItems.length > 0 && this.parsItems[0].length > 0) {
      this.selectedItems  = this.allCities.filter(item => this.parsItems.some(text => item.item_text.includes(text)));
    }
    else
    {
      this.selectedItems = [];
    }
    this.parsTime = this.parsTime.split('\n');
    const days =  ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
    const time_placeHolder = this.translateService.instant('distribution-array.time_placeHolder');
    // const time_placeHolder = {'distribution-array.time_placeHolder'|translate()}
    days.forEach(day => {
      const index = this.parsTime[0] !== time_placeHolder ? this.parsTime.findIndex(text => text.includes(day)) : -1;
      const isDayInParsTime = index !== -1;
      const enableControl = new FormControl(isDayInParsTime);
      const startControl = new FormControl({
        value: isDayInParsTime ? this.getTimeValue(this.parsTime[index]?.split(' ')[1]?.split('-')[0]) : { hour: 0, minute: 0 },
        disabled: !isDayInParsTime
      });
      const endControl = new FormControl({
        value: isDayInParsTime ? this.getTimeValue(this.parsTime[index]?.split('-')[1]) : { hour: 0, minute: 0 },
        disabled: !isDayInParsTime
      });
      // Subscribe to value changes for start and end time controls
      startControl.valueChanges.subscribe(value => {
      });

      endControl.valueChanges.subscribe(value => {
      });
      this.formGroup.addControl(`enableTimepicker${day}`, enableControl);
      this.formGroup.addControl(`general_from_time_start${day}`, startControl);
      this.formGroup.addControl(`general_from_time_end${day}`, endControl);
    });






    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'בחר הכל',
      unSelectAllText: 'נקה בחירה',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }


  ngAfterViewInit() {
    // Use setTimeout to defer the changes
    setTimeout(() => {
      this.checkInitialState();
    });
  }

  checkInitialState() {
    // Perform any logic that might trigger change detection errors here
    console.log('ngAfterViewInit');

  }


  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private langServ: LanguageService,
    private alertServ: AlertService,
    private translateService: TranslateService,
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef here
  ) {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      text: [null, Validators.required],
      // general_from_time: [{ hour: 10, minute: 0 }]
      general_from_time: new FormControl({ value: { hour: 10, minute: 0 }, disabled: false }, Validators.required)
    });


    // ['א', 'ב', 'ג', 'ד', 'ה', 'ו'].forEach(day => {
    //   this.formGroup.addControl(`enableTimepicker${day}`, new FormControl(false)); // Initialize with false
    //   this.formGroup.addControl(`general_from_time_start${day}`, new FormControl({  value: { hour: 10, minute: 0 }, disabled: false }));
    //   this.formGroup.addControl(`general_from_time_end${day}`, new FormControl({  value: { hour: 12, minute: 0 }, disabled: false }));
    // });

  }
  public setForm() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data, Validators.required),
    });
  }

  get isEdit() {
    return !!this._dataEdit;
  }
  get f() {
    return this.formGroup.controls;
  }
  get from_date_time() {
    return this.formGroup.get('general_from_time');
  }
  public save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    console.log(this.formGroup.value);
  }

  public resetForm() {
    // beacuse i need select all crickter by default when i click on reset button.
    this.setForm();
    this.multiSelect.toggleSelectAll();
    // i try below variable isAllItemsSelected reference from your  repository but still not working
    // this.multiSelect.isAllItemsSelected = true;
  }
  onCreateSubmit() {
    let time = '';
    const days = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
    days.forEach((day, index) => {
    if (this.getCheckboxValue(day))
    {
      const startTime = this.getStartTimeValue(day);
      const endTime = this.getEndTimeValue(day);
      time += `${day}: ${this.formatTimeValue(startTime.hour)}:${this.formatTimeValue(startTime.minute)}-${this.formatTimeValue(endTime.hour)}:${this.formatTimeValue(endTime.minute)}`;
      time += index < days.length - 1 ? '\n' : '';
    }
    });




    this.activeModal.close({selectedItems : this.selectedItems, destributionTime: time});
    // this.recipeServ.addRecipes(this.formGroup.value).subscribe({
    //   next: this.handleCreateSuccess.bind(this),
    //   error: this.handleError.bind(this),
    // });
  }

  onEditSubmit() {
    console.log('edit');
    // if (this.form.invalid) {
    //   return;
    // }
    // const data = deepClone(this.form.value);
    // if (this.form.controls.image.pristine) {
    //   delete data.image;
    //   delete data.image_name;
    // }
  }

  private handleCreateSuccess(res: any) {
    const { recipe_id } = res;
    const value = this.formGroup.value;
    value.recipe_id = recipe_id;
    this.activeModal.close(value);
  }

  private handleEditSuccess(res: any) {
    const value = this.formGroup.value;
    this.activeModal.close(value);
  }

  handleError(err: ErrorResp) {
    this.alertServ.showAlert(err.message, err.param);
  }

  toggleTimepicker(event: any, day: string) {
    const controlNameStart = `general_from_time_start${day}`;
    const controlNameEnd = `general_from_time_end${day}`;
    if (event.target.checked) {
      this.formGroup.get(controlNameStart)?.enable();
      this.formGroup.get(controlNameEnd)?.enable();
    } else {
      this.formGroup.get(controlNameStart)?.disable();
      this.formGroup.get(controlNameEnd)?.disable();
    }
  }

  private getTimeValue(time: string) {
    // console.log(time);
    const [hh, mm] = time.split(':').map(Number);
    return { hour: hh, minute: mm };
  }

  private formatTimeValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getCheckboxValue(day: string): boolean {
    const control = this.formGroup.get(`enableTimepicker${day}`);
    return control ? control.value : false;
  }

  getStartTimeValue(day: string): {hour: number, minute: number} {
    const control = this.formGroup.get(`general_from_time_start${day}`);
    return control ? control.value : null;
  }
  getEndTimeValue(day: string): {hour: number, minute: number} {
    const control = this.formGroup.get(`general_from_time_end${day}`);
    return control ? control.value : null;
  }



  get isRTL() {
    return this.langServ.isRtl;
  }
}
