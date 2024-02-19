import { Component, DestroyRef, inject } from '@angular/core';
import { FileUploadComponent } from './components/file-upload-button/file-upload-button.component';
import { FileUploadService } from './services/file-upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { tap } from 'rxjs';
import {
  FileUploadProcess,
  FileUploadStatus,
} from './model/file-upload-process';
import { FileUploadProcessComponent } from './components/file-upload-process/file-upload-process.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, FileUploadProcessComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
