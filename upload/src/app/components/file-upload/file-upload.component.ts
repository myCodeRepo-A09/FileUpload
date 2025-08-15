import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {UploadService} from '../../services/upload.service';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-file-upload',
  imports: [CommonModule,MatProgressBarModule,FileSizePipe],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  uploading = false;
  progress = 0;
  uploadComplete = false;
  error: string | null = null;
  videoUrl: string | null = null;
  videoType = '';
  imageUrl: string | null = null;
  imageType = '';
  isVideoFile = false;
  isImageFile=false;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileSelection(event.dataTransfer.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleFileSelection(file: File): void {
    this.resetState();
    this.selectedFile = file;
    this.isVideoFile = file.type.startsWith('video/');
    this.isImageFile=file.type.startsWith('image/');
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.progress = 0;
    this.error = null;

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.uploadComplete = true;
          this.uploading = false;
          if (this.isVideoFile && event.body?.filePath) {
            this.videoUrl = `http://localhost:3000/stream/${event.body.filePath}`;
            this.videoType = this.selectedFile?.type || '';
          }
          else if(this.isImageFile && event.body?.filePath){
            this.uploadService.getImageFile(event.body.filePath).subscribe({
              next:(file:any)=>{
                this.imageUrl=file
                
              },
              error: (err:any) => {
                this.error = err.message || 'get image failed';
                this.uploading = false;
              }
            })
            
          }
        }
      },
      error: (err:any) => {
        this.error = err.message || 'Upload failed';
        this.uploading = false;
      }
    });
  }

  private resetState(): void {
    this.selectedFile = null;
    this.uploading = false;
    this.progress = 0;
    this.uploadComplete = false;
    this.error = null;
    this.videoUrl = null;
    this.isVideoFile = false;
  }
}