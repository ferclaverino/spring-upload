import { Component, DestroyRef, inject } from '@angular/core';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUploadService } from './services/file-upload.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileUploadComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);

  uploadSucceeded = false;
  uploadFailed = false;

  constructor(private readonly fileUploadService: FileUploadService) {}

  fileSelected(file: File) {
    this.fileUploadService
      .upload(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.uploadSucceeded = true;
        },
        error: (error) => {
          this.uploadFailed = true;
          console.log(error);
        },
        complete: () => {},
      });
  }
}
