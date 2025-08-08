import { SharedModule } from './../../../../../../common/shared.module';
import { Component, Input } from '@angular/core';
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
  PRIMARY_IMAGE = 'primaryImage',
  COVER_IMAGE = 'coverImage',
}

@Component({
  selector: 'app-add-edit-event-modal',
  imports: [...antDesignModules, SharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-event-modal.component.html',
  styleUrl: './add-edit-event-modal.component.scss'
})

export class AddEditEventModalComponent {
  @Input() title: string = 'Create New Event';

  UploadZoneType = UploadZoneType
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    primaryImage: new FormControl('', [Validators.required]),
    coverImage: new FormControl('', [Validators.required]),
    public: new FormControl(true),
  });

  primaryImageFileList: NzUploadFile[] = [];
  coverImageFileList: NzUploadFile[] = [];

  constructor(private modalRef: NzModalRef) { }

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
    this.modalRef.close(this.form.value);
  }

  onCancelBtnClicked(): void {
    this.modalRef.destroy();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control?.touched && control?.invalid);
  }


}
