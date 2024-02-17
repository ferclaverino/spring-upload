import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<void>('/api/thumbnail-upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
