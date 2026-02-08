import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state-container">
      <div class="empty-state-icon">{{ icon }}</div>
      <h3 class="empty-state-title">{{ title }}</h3>
      <p class="empty-state-message">{{ message }}</p>
      <button *ngIf="actionLabel" 
              class="btn btn-primary mt-3" 
              (click)="action.emit()">
        {{ actionLabel }}
      </button>
    </div>
  `,
  styles: [`
    .empty-state-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      background: white;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .empty-state-icon {
      font-size: 4em;
      margin-bottom: 20px;
      opacity: 0.6;
    }

    .empty-state-title {
      font-size: 1.5em;
      color: #333;
      margin: 0 0 10px 0;
      font-weight: 600;
    }

    .empty-state-message {
      color: #999;
      margin: 0;
      max-width: 400px;
      line-height: 1.5;
    }

    .mt-3 {
      margin-top: 20px;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '📭';
  @Input() title = 'No data found';
  @Input() message = 'There is nothing to display right now.';
  @Input() actionLabel: string | null = null;
  @Output() action = new EventEmitter<void>();
}
