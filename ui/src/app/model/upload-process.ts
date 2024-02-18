import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

export enum UploadStatus {
  PENDING,
  UPLOADING,
  SUCCEDED,
  FAILED,
}

export class UploadProcess {
  private _status = UploadStatus.PENDING;
  private _progress = 0;
  private _errorMessage = '';

  get status(): UploadStatus {
    return this._status;
  }

  get progress(): number {
    return this._progress;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  start() {
    this._status = UploadStatus.UPLOADING;
    this._progress = 0;
  }

  success() {
    this._status = UploadStatus.SUCCEDED;
  }

  fail(errorResponse: HttpErrorResponse) {
    this._status = UploadStatus.FAILED;
    if (errorResponse.error.detail) {
      this._errorMessage = errorResponse.error.detail;
    } else if (errorResponse.error.message) {
      this._errorMessage = errorResponse.error.message;
    } else {
      this._errorMessage = errorResponse.error;
    }
  }

  updateProgress(event: HttpEvent<void>) {
    if (event.type == HttpEventType.UploadProgress) {
      if (!event.total) return;
      this._progress = Math.round(100 * (event.loaded / event.total));
    }
  }
}
