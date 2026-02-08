import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css']
})
export class AvatarUploadComponent {
  @Input() currentAvatar: string | null = null;
  @Input() userName: string = '';
  @Output() avatarChange = new EventEmitter<string>();

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  preview: string | null = null;
  isDragging = false;
  uploadProgress = 0;
  isUploading = false;
  errorMessage = '';

  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  ngOnInit() {
    this.preview = this.currentAvatar || null;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  private processFile(file: File) {
    this.errorMessage = '';

    // Validate file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.errorMessage = 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.';
      return;
    }

    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      this.errorMessage = `File size (${sizeMB}MB) exceeds maximum allowed size of 5MB.`;
      return;
    }

    this.uploadProgress = 0;
    this.isUploading = true;

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      }
    };

    reader.onload = () => {
      const result = reader.result as string;
      this.preview = result;
      this.uploadProgress = 100;

      // Simulate completion delay
      setTimeout(() => {
        this.isUploading = false;
        this.avatarChange.emit(result);
      }, 300);
    };

    reader.onerror = () => {
      this.errorMessage = 'Failed to read file. Please try again.';
      this.isUploading = false;
    };

    reader.readAsDataURL(file);
  }

  removeAvatar() {
    this.preview = null;
    this.avatarChange.emit('');
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFileSize(file: File): string {
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB < 1) {
      return Math.round((file.size / 1024) * 100) / 100 + ' KB';
    }
    return Math.round(sizeInMB * 100) / 100 + ' MB';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }
}
