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

// Smart component for file upload
// This component is a composition of 2 presentational components: upload button and upload process (S of solid)
// It is responsible coordinate them and make api calls (that is why is called smart)
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

  // Use a presentation model (https://martinfowler.com/eaaDev/PresentationModel.html)
  // to move logic from view to an agnostic place, where is easier to test
  processes: FileUploadProcess[] = [];

  constructor(private readonly fileUploadService: FileUploadService) {}

  filesSelected(files: File[]) {
    this.processes = files.map((file) => this.startUpload(file));
  }

  private startUpload(file: File): FileUploadProcess {
    const uploadProcess = new FileUploadProcess();
    // Each file starts its own upload api call
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
