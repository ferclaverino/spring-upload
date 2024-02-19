import { Component, Input } from '@angular/core';
import {
  FileUploadProcess,
  FileUploadStatus,
} from '../../model/file-upload-process';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload-process.component.html',
  styleUrl: './file-upload-process.component.scss',
})
export class FileUploadProcessComponent {
  readonly FileUploadStatus = FileUploadStatus;

  @Input()
  fileUploadProcess!: FileUploadProcess;
}
