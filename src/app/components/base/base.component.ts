import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  template: `
    <aside class="sidebar">
      <h2 class="company-name">company name</h2>
      
      <div class="nav-header">
        <a class="status-point blinking"
           href="http://status.nextcaller.com"
           target="_blank">
        </a>
        <a [routerLink]="['api-usage']" class="logo">
          <img src="assets/img/nextcaller-big-logo-white.svg" alt="" />
        </a>
      </div>
      
      <nav>
        <ul class="nav-list nav-list-iconed">
          <li class="nav-item">
            <a class="nav-link  nav-link-dashboard iconed" [routerLink]="['api-usage']" routerLinkActive="active">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  nav-link-run-data iconed" [routerLink]="['prospect']" routerLinkActive="active">Run Data</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  nav-link-billing iconed" [routerLink]="['billing']" routerLinkActive="active">Billing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  nav-link-fraud iconed" [routerLink]="['fraud']" routerLinkActive="active">Phone Fraud</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  nav-link-platform iconed" routerLinkActive="active">Platform Accounts ???</a>
          </li>
        </ul>
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['account']" routerLinkActive="active">Account</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['documentation']" routerLinkActive="active">Docs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['http://status.nextcaller.com']" routerLinkActive="active">API Status</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['mailto:support@nextcaller.com']" routerLinkActive="active">Support</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['logout']" routerLinkActive="active">Logout</a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => console.log(data));
  }

}
