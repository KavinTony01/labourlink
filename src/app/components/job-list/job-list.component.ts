import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent {
  jobs: Job[] = [];
  @Input() showOnlyOpen = false;
  @Input() filter: string = '';
  @Output() book = new EventEmitter<string>();

  constructor(private jobService: JobService) {
    this.jobService.jobs$.subscribe(j => this.jobs = j);
  }

  onBook(jobId: string) { this.book.emit(jobId); }

  get visibleJobs() {
    let list = this.jobs;
    if (this.showOnlyOpen) list = list.filter(j => j.status === 'open');
    if (this.filter && this.filter.trim()) {
      const f = this.filter.toLowerCase();
      list = list.filter(j => j.type.toLowerCase().includes(f) || j.location.toLowerCase().includes(f) || j.description.toLowerCase().includes(f));
    }
    return list;
  }
}
