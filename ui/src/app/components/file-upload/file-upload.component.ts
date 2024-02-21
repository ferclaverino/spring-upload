import { Component, DestroyRef, inject } from '@angular/core';
import { FileUploadProcess } from '../../model/file-upload-process';
import { Observable, Subject, tap } from 'rxjs';
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
  private _files = new Subject<File>();
  uploadProccesses!: Observable<FileUploadProcess>;

  private readonly destroyRef = inject(DestroyRef);

  processes: FileUploadProcess[] = [];

  constructor(private readonly fileUploadService: FileUploadService) {}

  filesSelected(files: File[]) {
    this.processes = files.map((file) => this.startUpload(file));
  }

  private startUpload(file: File): FileUploadProcess {
    const uploadProcess = new FileUploadProcess();
    this.fileUploadService
      .upload(file)
      .pipe(
        tap(() => uploadProcess.start()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (event: HttpEvent<void>) => {
          if (event.type == HttpEventType.UploadProgress) {
            uploadProcess.updateProgress(event);
          } else {
            uploadProcess.success();
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          uploadProcess.fail(errorResponse);
          console.log(errorResponse, uploadProcess);
        },
      });
    return uploadProcess;
  }
}
