import { HttpEvent, HttpEventType } from '@angular/common/http';

export enum UploadStatus {
  PENDING,
  UPLOADING,
  SUCCEDED,
  FAILED,
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
    this._progress = 0;
  }

  success() {
    this._status = UploadStatus.SUCCEDED;
  }

  fail() {
    this._status = UploadStatus.FAILED;
  }

  updateProgress(event: HttpEvent<void>) {
    if (event.type == HttpEventType.UploadProgress) {
      if (!event.total) return;
      this._progress = Math.round(100 * (event.loaded / event.total));
    }
  }
}
