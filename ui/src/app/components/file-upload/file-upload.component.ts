import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  fileName = '';

  @Output()
  fileSelected = new EventEmitter<File>();

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    const file: File = target.files[0];

    this.fileName = file.name;
    this.fileSelected.emit(file);
  }
}
