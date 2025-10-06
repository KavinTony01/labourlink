import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `<div *ngIf="msg" class="toast-notice">{{msg}}</div>`,
  styles: [`.toast-notice{position:fixed;right:20px;bottom:20px;background:#0d6efd;color:#fff;padding:12px 18px;border-radius:6px;box-shadow:0 6px 18px rgba(13,110,253,.2);}`]
})
export class ToastComponent { msg: string | null = null; constructor(public t: ToastService) { t.messages$.subscribe(m => this.msg = m); } }
