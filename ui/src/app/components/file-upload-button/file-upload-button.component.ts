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
  selected = false;

  @Output()
  filesSelected = new EventEmitter<File[]>();

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;

    this.selected = true;
    const files: File[] = [];
    for (let i = 0; i < target.files.length; i++) {
      files.push(target.files[i]);
    }
    this.filesSelected.emit(files);
  }
}
