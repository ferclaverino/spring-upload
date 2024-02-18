import { Component, DestroyRef, inject } from '@angular/core';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadService } from './services/file-upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { tap } from 'rxjs';
import { UploadProcess, UploadStatus } from './model/upload-process';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly uploadProcess = new UploadProcess();
  readonly UploadStatus = UploadStatus;

  constructor(private readonly fileUploadService: FileUploadService) {}

  fileSelected(file: File) {
    this.fileUploadService
      .upload(file)
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
          console.log(errorResponse);
        },
      });
  }
}
