import { HttpEvent, HttpEventType } from '@angular/common/http';

export enum UploadStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class UploadProcess {
  private _status = UploadStatus.PENDING;
  private _progress = 0;

  get status(): UploadStatus {
    return this._status;
  }

  get progress(): number {
    return this._progress;
  }

  start() {
    this._status = UploadStatus.UPLOADING;
  }

  success() {
    this._status = UploadStatus.SUCCESS;
  }

  fail() {
    this._status = UploadStatus.FAIL;
  }

  updateProgress(event: HttpEvent<void>) {
    if (event.type == HttpEventType.UploadProgress) {
      if (!event.total) return;
      this._progress = Math.round(100 * (event.loaded / event.total));
    }
  }
}
