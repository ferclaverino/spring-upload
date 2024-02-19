import { Component, DestroyRef, inject } from '@angular/core';
import { FileUploadProcess } from '../../model/file-upload-process';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { FileUploadService } from '../../services/file-upload.service';
import { FileUploadButtonComponent } from '../file-upload-button/file-upload-button.component';
import { FileUploadProcessComponent } from '../file-upload-process/file-upload-process.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FileUploadButtonComponent,
    FileUploadProcessComponent,
    CommonModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  private readonly destroyRef = inject(DestroyRef);

  uploadProcess = new FileUploadProcess();

  constructor(private readonly fileUploadService: FileUploadService) {}

  filesSelected(files: FileList) {
    this.uploadProcess = new FileUploadProcess();
    this.fileUploadService
      .upload(files[0])
      .pipe(
        tap(() => this.uploadProcess.start()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (event: HttpEvent<void>) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProcess.updateProgress(event);
          } else {
            this.uploadProcess.success();
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.uploadProcess.fail(errorResponse);
          console.log(errorResponse, this.uploadProcess);
        },
      });
  }
}
