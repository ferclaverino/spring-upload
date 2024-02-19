import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload-button.component.html',
  styleUrl: './file-upload-button.component.scss',
})
export class FileUploadButtonComponent {
  areFilesSelected = false;

  @Output()
  filesSelected = new EventEmitter<FileList>();

  onFilesSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    this.areFilesSelected = true;
    this.filesSelected.emit(target.files);
  }
}
