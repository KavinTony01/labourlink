import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  postJob(job: Omit<Job, 'id' | 'status' | 'worker' | 'postedBy'> & { postedBy: { id: string; username: string; displayName: string; mobile?: string } }) {
    const jobs = this.jobsSubject.value.slice();
    const newJob: Job = {
      id: 'job-' + (Date.now()),
      ...job,
      status: 'open',
      worker: null
    } as Job;
    jobs.unshift(newJob);
    this.save(jobs);
  }

  bookJob(jobId: string, worker: { id?: string; username?: string; displayName: string; mobile?: string }): boolean {
    const jobs = this.jobsSubject.value.slice();
    const idx = jobs.findIndex(j => j.id === jobId);
    if (idx === -1) return false;
    if (jobs[idx].status !== 'open') return false;
    const workerObj = {
      id: worker.id || (worker.username ? worker.username : 'unknown'),
      username: worker.username || '',
      displayName: worker.displayName,
      mobile: worker.mobile || ''
    };
    jobs[idx] = { ...jobs[idx], status: 'booked', worker: workerObj } as Job;
    this.save(jobs);
    return true;
  }

  getOpenJobs(): Job[] {
    return this.jobsSubject.value.filter(j => j.status === 'open');
  }
}
