import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable()
export class JobService {
  private STORAGE_KEY = 'labourlink_jobs';

  private initialJobs: Job[] = [
    {
      id: 'job-1', type: 'Plumbing', description: 'Fix kitchen sink leakage', location: 'Chennai', date: '2025-10-10', time: '10:00', pay: 500,
      status: 'open', worker: null, postedBy: { id: 'client-101', username: 'client1', displayName: 'Darth Vader', mobile: '9876543210' }
    }
  ];

  private jobsSubject = new BehaviorSubject<Job[]>(this.loadFromStorage());
  jobs$ = this.jobsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  private loadFromStorage(): Job[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.initialJobs));
      return this.initialJobs.slice();
    }
    try { return JSON.parse(raw) as Job[]; } catch { return this.initialJobs.slice(); }
  }

  private save(jobs: Job[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
    this.jobsSubject.next(jobs);
  }

  postJob(job: Omit<Job, 'id' | 'status' | 'worker' | 'postedBy'> & { postedBy: { id: string; username: string; displayName: string; mobile?: string } }): Observable<Job> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return new Observable(observer => {
      setTimeout(() => {
        try {
          const jobs = this.jobsSubject.value.slice();
          const newJob: Job = {
            id: 'job-' + (Date.now()),
            ...job,
            status: 'open',
            worker: null
          } as Job;
          jobs.unshift(newJob);
          this.save(jobs);
          observer.next(newJob);
          observer.complete();
          this.loadingSubject.next(false);
        } catch (error) {
          const errorMsg = 'Failed to post job';
          this.errorSubject.next(errorMsg);
          observer.error(errorMsg);
          this.loadingSubject.next(false);
        }
      }, 300);
    });
  }

  bookJob(jobId: string, worker: { id?: string; username?: string; displayName: string; mobile?: string }): boolean {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    try {
      const jobs = this.jobsSubject.value.slice();
      const idx = jobs.findIndex(j => j.id === jobId);
      if (idx === -1) {
        throw new Error('Job not found');
      }
      if (jobs[idx].status !== 'open') {
        throw new Error('Job is no longer available');
      }
      const workerObj = {
        id: worker.id || (worker.username ? worker.username : 'unknown'),
        username: worker.username || '',
        displayName: worker.displayName,
        mobile: worker.mobile || ''
      };
      jobs[idx] = { ...jobs[idx], status: 'booked', worker: workerObj } as Job;
      this.save(jobs);
      this.loadingSubject.next(false);
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to book job';
      this.errorSubject.next(errorMsg);
      this.loadingSubject.next(false);
      return false;
    }
  }

  getOpenJobs(): Job[] {
    return this.jobsSubject.value.filter(j => j.status === 'open');
  }

  completeJob(jobId: string): boolean {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    try {
      const jobs = this.jobsSubject.value.slice();
      const idx = jobs.findIndex(j => j.id === jobId);
      if (idx === -1) {
        throw new Error('Job not found');
      }
      if (jobs[idx].status !== 'booked') {
        throw new Error('Only booked jobs can be completed');
      }

      jobs[idx] = { 
        ...jobs[idx], 
        status: 'completed',
        completedDate: new Date()
      } as Job;
      this.save(jobs);
      this.loadingSubject.next(false);
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to complete job';
      this.errorSubject.next(errorMsg);
      this.loadingSubject.next(false);
      return false;
    }
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
