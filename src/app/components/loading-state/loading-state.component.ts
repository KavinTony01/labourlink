import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f0f0f0;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      color: #999;
      font-size: 0.95em;
      margin: 0;
    }
  `]
})
export class LoadingStateComponent {
  message = 'Loading...';
}
