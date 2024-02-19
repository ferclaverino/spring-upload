import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

export enum FileUploadStatus {
  PENDING,
  UPLOADING,
  SUCCEDED,
  FAILED,
}

export class FileUploadProcess {
  private _status = FileUploadStatus.PENDING;
  private _progress = 0;
  private _errorMessage = '';

  get status(): FileUploadStatus {
    return this._status;
  }

  get progress(): number {
    return this._progress;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  start() {
    this._status = FileUploadStatus.UPLOADING;
    this._progress = 0;
  }

  success() {
    this._status = FileUploadStatus.SUCCEDED;
  }

  fail(errorResponse: HttpErrorResponse) {
    this._status = FileUploadStatus.FAILED;
    if (errorResponse.error?.detail) {
      // spring web errors
      this._errorMessage = errorResponse.error.detail;
    } else if (errorResponse.error?.message) {
      // api errors
      this._errorMessage = errorResponse.error.message;
    } else {
      // other errors
      this._errorMessage = 'We are having unexpected issues';
    }
  }

  updateProgress(event: HttpEvent<void>) {
    if (event.type == HttpEventType.UploadProgress) {
      if (!event.total) return;
      this._progress = Math.round(100 * (event.loaded / event.total));
    }
  }
}
