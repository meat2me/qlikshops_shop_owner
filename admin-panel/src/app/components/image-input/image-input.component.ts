import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { truncateBase64 } from 'app/utils/truncate-base64';
import { readFile } from '@utils/read-file';

export type ImageFormValues = any;

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements OnInit {
  @Input() tempImg = '';
  isDragging = false;
  @Input() blocked = false;
  @Input() formImageName = 'image_name';
  @Input() formImageDataName = 'image';
  @Input() formGroup: FormGroup = null;
  @Input() isDeletable = true;
  @Output() onBlock = new EventEmitter();

  get imageDataCtrl() {
    return this.formGroup.controls[this.formImageDataName];
  }

  get imageNameCtrl() {
    return this.formGroup.controls[this.formImageName];
  }

  isUsingFormGroup() {
    return !!this.formGroup;
  }

  constructor(public controlContainer: ControlContainer) {}

  ngOnInit(): void {
    if (this.isUsingFormGroup) {
      this.formGroup = this.controlContainer.control as FormGroup;
    }
  }

  async onLoad(files: FileList) {
    const file = files[0];
    this.imageNameCtrl.setValue(file.name);
    this.tempImg = await readFile(file);
    this.imageDataCtrl.setValue(truncateBase64(this.tempImg));
    this.imageDataCtrl.markAsDirty();
    this.imageDataCtrl.markAsTouched();
  }

  rmImage() {
    this.tempImg = '';
    if (this.isUsingFormGroup) {
      this.imageDataCtrl.reset();
      this.imageDataCtrl.markAsDirty();
      this.imageNameCtrl.reset();
      this.imageNameCtrl.markAsDirty();
    } else {
      this.formGroup.reset();
      this.formGroup.markAsDirty();
    }
  }
}
