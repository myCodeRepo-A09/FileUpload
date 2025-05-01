export interface Upload {
    id?: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isVideo: boolean;
    duration?: number;
    thumbnailPath?: string;
    status?: UploadStatus;
    url?: string;
    streamUrl?: string;
    progress?: number; // For upload progress tracking
    error?: string; // For error handling
  }
  
  // For type-safe mime type checking
  export type UploadMimeType = 
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'video/mp4'
    | 'video/quicktime'
    | 'video/x-msvideo'
    | string; // Fallback for other types

    enum UploadStatus {
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
        QUEUED = 'queued',
        UPLOADING = 'uploading'
      }