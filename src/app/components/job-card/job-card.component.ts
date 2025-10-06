import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html'
})
export class JobCardComponent {
  @Input() job!: Job;
  @Input() showOnlyOpen = false;
  @Output() book = new EventEmitter<string>();

  emitBook() { this.book.emit(this.job.id); }
}
