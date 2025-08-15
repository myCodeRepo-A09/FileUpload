import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { blob } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getImageFile(filePath: string): Observable<string> {
    return this.http
      .get(`${this.apiUrl}/image/${filePath}`, { responseType: 'blob' })
      .pipe(
        map((blob) => URL.createObjectURL(blob)),
        catchError(() => throwError('error'))
      );
  }
}
