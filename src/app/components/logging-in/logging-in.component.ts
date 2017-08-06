import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-logging-in',
  template: '<h1>Logging in</h1>',
})
export class LoggingInComponent implements OnInit {
  private subscription: Subscription;
  private ncToken:string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.ncToken = this.route.snapshot.queryParams['token'];

    if (this.ncToken) {
      localStorage.setItem('nctoken', this.ncToken);
      this.router.navigate(['']);
    } else {
      this.router.navigate(['error']);
    }
  }
}
