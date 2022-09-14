import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

export type UploadConfigType = {
  label?: string,
  labelClass?: string,
  hostClass?: string
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {
  @Input("uploadConfig") uploadConfig: UploadConfigType = {};
  _defaultImages: string[] = [];

  @Input("defaultImages") set defaultImages(images: string[]) {
    this._defaultImages = images;
    this.fileConfig = {files: this.defaultImages}
  }

  get defaultImages() {
    return this._defaultImages;
  }

  @Input("addImage") addImage: (item: string[]) => void = () => {
  };
  @ViewChild("fileInput") fileInput!: ElementRef;
  fileConfig: { files: string[] } = {
    files: [],
  }

  deleteImage(index: number) {
    this.defaultImages.splice(index, 1)
  }

  fireInputOnChange() {
    this.fileInput.nativeElement.click()
  }

  fileChange() {
    const file = this.fileInput.nativeElement.files[0];
    const reader = new FileReader();

    reader.onload = (_event: any) => {
      this.fileConfig = {files: [...this.fileConfig.files, _event.target.result]};
      this.fileInput.nativeElement.value = '';
      this.addImage(this.fileConfig.files);
    };
    reader.readAsDataURL(file);
  }

  constructor() {
  }

  ngOnInit(): void {
    debugger
  }

}
