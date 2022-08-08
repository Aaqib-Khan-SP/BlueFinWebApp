import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { ErrorResponse } from 'src/shared/models';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorResponse: ErrorResponse;
  constructor(private route:Router) { 
    let nav: Navigation = this.route.getCurrentNavigation()!; 
    this.errorResponse = <ErrorResponse>nav.extras.state;
  }

  ngOnInit(): void {
    
  }

}
