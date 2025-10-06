import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private STORAGE_KEY = 'labourlink_current_user';

  private users: User[] = [
    // 5 Clients (villain names)
    { id: 'client-101', username: 'client1', password: '123', role: 'Client', displayName: 'Darth Vader', mobile: '9876543210' },
    { id: 'client-102', username: 'client2', password: '123', role: 'Client', displayName: 'Lord Voldemort', mobile: '9876501234' },
    { id: 'client-103', username: 'client3', password: '123', role: 'Client', displayName: 'Thanos', mobile: '9001122334' },
    { id: 'client-104', username: 'client4', password: '123', role: 'Client', displayName: 'Hannibal Lecter', mobile: '9009988776' },
    { id: 'client-105', username: 'client5', password: '123', role: 'Client', displayName: 'Agent Smith', mobile: '9012345678' },
    // 5 Workers (hero names)
    { id: 'worker-201', username: 'worker1', password: '123', role: 'Worker', displayName: 'Tom Cruise', mobile: '9011122334' },
    { id: 'worker-202', username: 'worker2', password: '123', role: 'Worker', displayName: 'Brad Pitt', mobile: '9002233445' },
    { id: 'worker-203', username: 'worker3', password: '123', role: 'Worker', displayName: 'Leonardo DiCaprio', mobile: '9003344556' },
    { id: 'worker-204', username: 'worker4', password: '123', role: 'Worker', displayName: 'Chris Hemsworth', mobile: '9004455667' },
    { id: 'worker-205', username: 'worker5', password: '123', role: 'Worker', displayName: 'Robert Downey Jr', mobile: '9005566778' }
  ];

  // Add admin user
  // Note: admin credentials: admin / 1234
  private adminUser: User = { id: 'admin-1', username: 'admin', password: '1234', role: 'Admin', displayName: 'Administrator', mobile: '9000000000' };

  // include admin in users list at runtime
  constructor() {
    // prepend admin so it's discoverable
    this.users.unshift(this.adminUser);
  }

  private userSubject = new BehaviorSubject<User | null>(this.loadFromStorage());
  currentUser$ = this.userSubject.asObservable();

  private loadFromStorage(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as User; } catch { return null; }
  }

  login(username: string, password: string): boolean {
    const found = this.users.find(u => u.username === username && u.password === password);
    if (!found) return false;
    const safe = { id: found.id, username: found.username, role: found.role, displayName: found.displayName, mobile: found.mobile } as User;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safe));
    this.userSubject.next(safe);
    return true;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.userSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // helper to expose seeded users (for display/debug)
  getAllUsers(): User[] {
    return this.users.slice();
  }

  // Non-persistent update of profile: updates in-memory seed and current session
  updateProfile(partial: Partial<User>) {
    const current = this.userSubject.value;
    if (!current) return false;
    const updated = { ...current, ...partial } as User;
    // update seeded users array
    const idx = this.users.findIndex(u => u.id === updated.id || u.username === updated.username);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...partial };
    }
    // persist to localStorage for session
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    this.userSubject.next(updated);
    return true;
  }
}
