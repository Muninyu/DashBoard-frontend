import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

export interface CHData {
  chdate: string;
  ch01: number;
  ch02: number;
  ch03: number;
  temperature: number;
  enthalpy: number;
}

@Component({
  selector: 'app-chart2',
  standalone: true,
  imports: [],
  templateUrl: './chart2.component.html',
  styleUrl: './chart2.component.css'
})
export class Chart2Component implements OnInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  CHData: string[] = [];
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}
  
  CHDate: string[] = [];
  CH01: number[] = [];
  CH02: number[] = [];
  CH03: number[] = [];
  Temperature: number[] = [];
  Enthalpy: number[] = [];

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.http.get<CHData[]>('http://localhost:8080/api/CHData').subscribe({
        next: (data: CHData[]) => {
          data.forEach((item) => {
            this.CHDate.push(this.formatDate(item.chdate));
            this.CH01.push(item.ch01);
            this.CH02.push(item.ch02);
            this.CH03.push(item.ch03);
            this.Temperature.push(item.temperature);
            this.Enthalpy.push(item.enthalpy);
          });
          this.initializeChart();
        },
        error: (err) => console.error('API error', err)
      });
    }
  }

  private initializeChart(): void {
    if (this.chartContainer) {
      Highcharts.chart(this.chartContainer.nativeElement, {
        chart: {
            type: 'column',
        },
        title: {
            text: 'CH'
        },
        xAxis: {
            categories: this.CHDate,
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: [
          {
            title: {
                text: '用電量(kWh)'
            },
            opposite: false,
          },
          {
            title: {
                text: '用氣量(m³)'
            },
            opposite: true,
          },
          {
            title: {
                text: '單位氣體用電量(kWh/m³)'
            },
            opposite: true,
          }
        ],
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'CDA#01',
                type: 'column',
                data: this.CH01,
                yAxis: 0,
            },
            {
                name: 'CDA#02',
                type: 'column',
                data: this.CH02,
                yAxis: 0
            },
            {
                name: 'CDA#03',
                type: 'column',
                data: this.CH03,
                yAxis: 0
            },
            {
                name: 'CDA用氣量',
                type: 'line',
                data: this.Temperature,
                yAxis: 1,
                color: 'red'
            },
            {
                name: '單位氣體用電量',
                type: 'line',
                data: this.Enthalpy,
                yAxis: 2,
                color: 'blue'
            }
        ]
      } as Highcharts.Options);
    }
  }
}

