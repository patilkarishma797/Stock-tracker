import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StockService } from '../stock.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
watchlist = ['bitcoin', 'ethereum', 'dogecoin'];

  chartData: any;
  selectedCoin = 'bitcoin';

  // Filters
  selectedDays = 7;
  selectedPrice: string = 'all';

  dayRanges = [
    { label: '7 Days', value: 7 },
    { label: '1 Month', value: 30 },
    { label: '3 Months', value: 90 }, 
    { label: '6 Months', value: 180 },
    { label: '1 Year', value: 365 }
  ];

  priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Below $100', value: 'below100' },
    { label: '$100 - $1000', value: '100-1000' },
    { label: 'Above $1000', value: 'above1000' }
  ];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadCrypto(this.selectedCoin);
  }

  loadCrypto(coin: string) {
    this.selectedCoin = coin;
    this.stockService.getCryptoData(coin, this.selectedDays).subscribe((data) => {
      let prices = data.prices.map((p: any) => ({ time: p[0], price: p[1] }));

      // Apply price filter
      if (this.selectedPrice !== 'all') {
        prices = this.filterByPrice(prices);
      }

      this.chartData = {
        labels: prices.map((p: any) => new Date(p.time).toLocaleDateString()),
        datasets: [
          {
            label: `${coin.toUpperCase()} Price`,
            data: prices.map((p: any) => p.price),
            borderColor: '#2575fc',
            fill: true,
            backgroundColor: 'rgba(37, 117, 252, 0.1)',
            tension: 0.3
          }
        ]
      };
    });
  }

  applyFilters() {
    this.loadCrypto(this.selectedCoin);
  }

  filterByPrice(prices: any[]) {
    switch (this.selectedPrice) {
      case 'below100':
        return prices.filter(p => p.price < 100);
      case '100-1000':
        return prices.filter(p => p.price >= 100 && p.price <= 1000);
      case 'above1000':
        return prices.filter(p => p.price > 1000);
      default:
        return prices;
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}