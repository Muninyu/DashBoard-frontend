import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Dashboards from '@highcharts/dashboards';

@Component({
  selector: 'app-chart-total-electric',
  standalone: true,
  imports: [],
  templateUrl: './chart-total-electric.component.html',
  styleUrl: './chart-total-electric.component.css'
})
export class ChartTotalElectricComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private csvData: string = `
    Vegetable,Amount
    Broccoli,44
    Carrots,51
    Corn,38
    Cucumbers,45
    Onions,57
    Potatos,62
    Spinach,35
    Tomatos,61
  `;

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    if (this.chartContainer) {
      Highcharts.setOptions({
        chart: {
          styledMode: true
        }
      });

      Dashboards.board(this.chartContainer.nativeElement, {
        dataPool: {
          connectors: [{
            id: 'VegeTable',
            type: 'CSV',
            options: {
              csv: this.csvData
            }
          }]
        },
        gui: {
          layouts: [{
            rows: [{
              cells: [{
                id: 'top-left'
              }, {
                id: 'top-right'
              }]
            }, {
              cells: [{
                id: 'bottom'
              }]
            }]
          }]
        },
        components: [{
          renderTo: 'top-left',
          type: 'Highcharts',
          sync: {
            highlight: true
          },
          connector: {
            id: 'VegeTable'
          },
          chartOptions: {
            chart: {
              type: 'bar'
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              series: {
                // colorByPoint: true
              }
            },
            title: {
              text: ''
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                // enabled: false
              }
            }
          }
        }, {
          renderTo: 'top-right',
          type: 'Highcharts',
          sync: {
            highlight: true
          },
          connector: {
            id: 'VegeTable'
          },
          chartOptions: {
            chart: {
              type: 'pie'
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              pie: {
                innerSize: '60%'
              },
              series: {
                // colorByPoint: true
              }
            },
            title: {
              text: ''
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                // enabled: false
              }
            }
          }
        }, {
          renderTo: 'bottom',
          type: 'Highcharts',
          sync: {
            highlight: true
          },
          connector: {
            id: 'VegeTable'
          },
          chartOptions: {
            chart: {
              type: 'scatter'
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              series: {
                // colorByPoint: true,
                dataSorting: {
                  enabled: true,
                  sortKey: 'y'
                },
                marker: {
                  radius: 8
                }
              }
            },
            title: {
              text: ''
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                // enabled: false
              }
            }
          }
        }]
      });
    }
  }
}
