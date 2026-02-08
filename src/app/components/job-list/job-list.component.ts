import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  loading = false;
  error: string | null = null;
  
  @Input() showOnlyOpen = false;
  @Input() filter: string = '';
  @Output() book = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadJobs(): void {
    this.jobService.jobs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(j => this.jobs = j);

    this.jobService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);

    this.jobService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => this.error = error);
  }

  onBook(jobId: string) { 
    this.book.emit(jobId); 
  }

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
