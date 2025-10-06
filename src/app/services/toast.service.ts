import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private subject = new BehaviorSubject<string | null>(null);
  messages$ = this.subject.asObservable();

  show(msg: string) { this.subject.next(msg); setTimeout(() => this.subject.next(null), 3000); }
}
