import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Chart1Component } from "./chart1/chart1.component";
import { ChartTotalElectricComponent } from './chart-total-electric/chart-total-electric.component';
import { Chart2Component } from "./chart2/chart2.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, Chart1Component, ChartTotalElectricComponent, Chart2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }
}