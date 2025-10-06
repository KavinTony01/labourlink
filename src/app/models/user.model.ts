export interface User {
  id: string; // e.g. client-101 or worker-201
  username: string;
  password?: string;
  role: 'Client' | 'Worker' | 'Admin';
  displayName: string;
  mobile?: string; // 10 digit mobile number
}
