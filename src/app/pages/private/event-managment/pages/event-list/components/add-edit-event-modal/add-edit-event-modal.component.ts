import { SharedModule } from '../../../../../../../common/shared.module';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const antDesignModules = [NzFormModule, NzInputModule, NzButtonModule, NzTypographyModule, NzUploadModule, NzSwitchModule , NzDatePickerModule]

enum UploadZoneType {
  PRIMARY_IMAGE = 'primaryImageUrl',
  COVER_IMAGE = 'coverImageUrl',
}

@Component({
  selector: 'app-add-edit-event-modal',
  imports: [...antDesignModules, SharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-event-modal.component.html',
  styleUrl: './add-edit-event-modal.component.scss'
})

export class AddEditEventModalComponent implements OnInit  {

  UploadZoneType = UploadZoneType
  editMode: boolean = false;
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    startDateTime: new FormControl<Date | null>(null, [Validators.required]),
    endDateTime: new FormControl<Date | null>(null, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    primaryImageUrl: new FormControl('', [Validators.required]),
    coverImageUrl: new FormControl('', [Validators.required]),
    isPublic: new FormControl(true),
  });

  primaryImageFileList: NzUploadFile[] = [];
  coverImageFileList: NzUploadFile[] = [];

  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      const {data , editMode} = this.modalRef.getConfig().nzData;
      if(editMode) {
        this.editMode = true;
        this.fillEventFormData(data);
      }
    }, 1);
  }

  fillEventFormData(data: any) {
    const {title , startDateTime , endDateTime , description , location , primaryImageUrl , coverImageUrl , isPublic} = data;
    this.form.patchValue({
      title: title,
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
      description: description,
      location: location,
      primaryImageUrl: primaryImageUrl,
      coverImageUrl: coverImageUrl,
      isPublic: isPublic,
    });
    this.primaryImageFileList = [{
      uid: primaryImageUrl,
      name: primaryImageUrl,
      status: 'done',
      url: primaryImageUrl
    }];
    this.coverImageFileList = [{
      uid: coverImageUrl,
      name: coverImageUrl,
      status: 'done',
      url: coverImageUrl
    }];
  }

  onUploadZoneChanged({ file, fileList }: { file: NzUploadFile; fileList: NzUploadFile[] }, uploadZoneType: UploadZoneType): void {
    if (file.status === 'removed') {
      this.form.patchValue({ [uploadZoneType]: null });
      uploadZoneType === UploadZoneType.PRIMARY_IMAGE ? this.primaryImageFileList = [] : this.coverImageFileList = [];
      return;
    }

    if (file.originFileObj) {
      this.getBase64(file.originFileObj, (img: string) => {
        this.form.patchValue({ [uploadZoneType]: img });
        uploadZoneType === UploadZoneType.PRIMARY_IMAGE ? this.primaryImageFileList = [{
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: img
        }]
          : this.coverImageFileList = [{
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: img
          }];
      });
    }

    uploadZoneType === UploadZoneType.PRIMARY_IMAGE ? this.primaryImageFileList = fileList : this.coverImageFileList = fileList;
  }

  getBase64(file: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(file);
  }

  onSaveBtnClicked(): void {
    this.modalRef.close({result: this.form.value , editMode: this.editMode});
  }

  onCancelBtnClicked(): void {
    this.modalRef.destroy();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control?.touched && control?.invalid);
  }


}
