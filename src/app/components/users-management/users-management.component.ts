import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  @Input() users: User[] = [];
  
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  searchText: string = '';
  filterRole: string = '';
  showCreateUserModal: boolean = false;
  createUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.filteredUsers = this.users;
  }
  
  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const searchMatch = user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(this.searchText.toLowerCase());
      const roleMatch = !this.filterRole || user.role === this.filterRole;
      return searchMatch && roleMatch;
    });
  }
  
  selectUser(user: User) {
    this.selectedUser = user;
  }

  viewUser(user: User) {
    this.selectUser(user);
    // Could open a user detail modal here if needed
  }

  toggleDisableUser(user: User) {
    user.disabled = !user.disabled;
    const action = user.disabled ? 'disabled' : 'enabled';
    alert(`User "${user.displayName}" has been ${action}!`);
  }
  
  getRoleClass(role: string): string {
    return `role-${role.toLowerCase()}`;
  }

  openCreateUserModal() {
    this.showCreateUserModal = true;
    this.createUserForm.reset();
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
    this.createUserForm.reset();
  }

  submitCreateUser() {
    if (this.createUserForm.valid) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        ...this.createUserForm.value
      };
      this.users.push(newUser);
      this.applyFilters();
      this.closeCreateUserModal();
      alert(`User "${newUser.displayName}" created successfully!`);
    }
  }
}
