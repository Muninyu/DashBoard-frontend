import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashBoardData: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('http://localhost:8080/api/data').subscribe({
      next: (data) =>(this.dashBoardData = data),
      error: (err) => console.error('API error', err)
    });
  }
}
