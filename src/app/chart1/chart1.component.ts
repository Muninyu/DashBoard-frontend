import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

export interface CDAData {
  cdadate: string;
  cda01: number;
  cda02: number;
  cda03: number;
  cdaairConsume: number;
  cdaairConsumeUnit: number;
}

@Component({
  selector: 'app-chart1',
  standalone: true,
  imports: [],
  templateUrl: './chart1.component.html',
  styleUrl: './chart1.component.css'
})
export class Chart1Component implements OnInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  CDAData: string[] = [];

  constructor(private http: HttpClient) {};
  
  CDADate: string[] = [];
  CDA01: number[] = [];
  CDA02: number[] = [];
  CDA03: number[] = [];
  CDAAirConsumn: number[] = [];
  CDAAirConsumnUnit: number[] = [];

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  }

  ngOnInit(): void {
    this.http.get<CDAData[]>('http://localhost:8080/api/CDAData').subscribe({
      next: (data: CDAData[]) => {
        data.forEach((item) => {
          this.CDADate.push(this.formatDate(item.cdadate));
          this.CDA01.push(item.cda01);
          this.CDA02.push(item.cda02);
          this.CDA03.push(item.cda03);
          this.CDAAirConsumn.push(item.cdaairConsume);
          this.CDAAirConsumnUnit.push(item.cdaairConsumeUnit);
        });
        this.initializeChart();
      },
      error: (err) => console.error('API error', err)
    });
  }

  private initializeChart(): void {
    if (this.chartContainer) {
      Highcharts.chart(this.chartContainer.nativeElement, {
        chart: {
            type: 'column',
        },
        title: {
            text: 'CDA'
        },
        xAxis: {
            categories: this.CDADate,
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
        tooltip: {
            valueSuffix: ' (1000 MT)'
        },
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
                data: this.CDA01,
                yAxis: 0,
            },
            {
                name: 'CDA#02',
                type: 'column',
                data: this.CDA02,
                yAxis: 0
            },
            {
                name: 'CDA#03',
                type: 'column',
                data: this.CDA03,
                yAxis: 0
            },
            {
                name: 'CDA用氣量',
                type: 'line',
                data: this.CDAAirConsumn,
                yAxis: 1,
                color: 'red'
            },
            {
                name: '單位氣體用電量',
                type: 'line',
                data: this.CDAAirConsumnUnit,
                yAxis: 2,
                color: 'blue'
            }
        ]
      } as Highcharts.Options);
    }
  }
}

