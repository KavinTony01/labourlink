import { Component } from '@angular/core';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.css']
})
export class SystemSettingsComponent {
  platformFee: number = 10;
  maxJobDurationDays: number = 30;
  minPayAmount: number = 100;
  maxPayAmount: number = 50000;
  enableNotifications: boolean = true;
  enableReviews: boolean = true;
  
  saveSettings() {
    alert('Settings saved successfully!');
  }
  
  resetSettings() {
    this.platformFee = 10;
    this.maxJobDurationDays = 30;
    this.minPayAmount = 100;
    this.maxPayAmount = 50000;
    this.enableNotifications = true;
    this.enableReviews = true;
  }
}
