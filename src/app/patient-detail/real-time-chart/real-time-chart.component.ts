import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.css'],
})
export class RealTimeChartComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  title = 'ng2-charts-demo';
  widthChart = 150;
  widthChartWrapper = 200;
  count = 0;

  hits = [0];
  data: number[] = [0];

  maxDataPoints = 30;

  public lineChartData!: ChartConfiguration<'line'>['data'];

  scrollToRight() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollLeft =
        this.scrollContainer.nativeElement.scrollWidth;
    }
  }

  public lineChartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        stacked: false,
        suggestedMax: this.maxDataPoints,
        // max: 150, // Define o valor máximo do eixo X''
        beginAtZero: true,
        afterDataLimits: (something) => console.log('LIMITE', something),
        beforeDataLimits: () => 'UE',
        afterFit(axis) {
          () => console.log('XAAAAMA', axis);
        },
        // reverse: true,
      },
      y: {
        beginAtZero: true,
        // stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 0,
    },
  };
  public lineChartLegend = true;
  private interval: any;

  ngOnInit() {
    // this.startUpdatingData();
    this.startUpdatingData2();
  }

  ngOnDestroy() {
    this.stopUpdatingData();
  }

  startUpdatingData2() {
    this.interval = setInterval(() => {
      this.count += 1;
      const lastSecond = this.hits[this.hits.length - 1];
      this.hits.push(lastSecond + 1);
      this.hits.push(lastSecond + 2);
      this.hits.push(lastSecond + 3);
      this.hits.push(lastSecond + 4);
      this.hits.push(lastSecond + 5);
      this.data.push(...this.generateRandomData());
      if (
        this.data.length == 21 ||
        this.data.length == 41 ||
        this.data.length == 61 ||
        this.data.length == 81
      ) {
        this.widthChart = this.widthChart + 200;
        this.scrollToRight();
      }
      if (this.data.length > 141) {
        this.hits = [0];
        this.data = [0];
      }
      this.lineChartData = {
        labels: this.hits,
        datasets: [
          {
            data: this.data,
            label: 'Series A',
            fill: false,
            tension: 0.1,
            borderColor: 'white',
            borderWidth: 2,
            backgroundColor: '#000000',
            pointRadius: 0,
          },
        ],
      };
    }, 1000);
  }

  // startUpdatingData() {
  //   this.interval = setInterval(() => {
  //     const lastSecond = this.hits[this.hits.length - 1];
  //     this.hits.push(lastSecond + 1);
  //     this.hits.push(lastSecond + 2);
  //     this.hits.push(lastSecond + 3);
  //     this.hits.push(lastSecond + 4);
  //     this.hits.push(lastSecond + 5);
  //     this.data.push(...this.generateRandomData());

  //     this.lineChartData = {
  //       labels: this.hits,
  //       datasets: [
  //         {
  //           data: this.data,
  //           label: 'Series A',
  //           fill: false,
  //           tension: 0.1,
  //           borderColor: 'white',
  //           borderWidth: 2,
  //           backgroundColor: '#000000',
  //           pointRadius: 0,
  //         },
  //       ],
  //     };
  //   }, 1000);
  // }

  stopUpdatingData() {
    clearInterval(this.interval);
  }

  private generateRandomData(): number[] {
    const randomData: number[] = [];
    for (let i = 0; i < 5; i++) {
      const randomValue = Math.floor(Math.random() * 4);
      randomData.push(randomValue);
    }
    return randomData;
  }
}
