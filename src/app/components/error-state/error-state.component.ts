import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-state',
  template: `
    <div class="error-container">
      <div class="error-icon">❌</div>
      <h3 class="error-title">{{ title }}</h3>
      <p class="error-message">{{ message }}</p>
      <button class="btn btn-outline-primary mt-3" (click)="retry.emit()">
        Try Again
      </button>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      border: 1px solid #ffcccb;
      background-color: #fff5f5;
    }

    .error-icon {
      font-size: 3em;
      margin-bottom: 15px;
    }

    .error-title {
      font-size: 1.3em;
      color: #d32f2f;
      margin: 0 0 10px 0;
      font-weight: 600;
    }

    .error-message {
      color: #c62828;
      margin: 0;
      max-width: 400px;
      line-height: 1.5;
    }

    .mt-3 {
      margin-top: 20px;
    }

    .btn-outline-primary {
      border-color: #d32f2f;
      color: #d32f2f;
    }

    .btn-outline-primary:hover {
      background-color: #d32f2f;
      color: white;
    }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Something went wrong';
  @Input() message = 'An error occurred while loading the data. Please try again.';
  @Output() retry = new EventEmitter<void>();
}
