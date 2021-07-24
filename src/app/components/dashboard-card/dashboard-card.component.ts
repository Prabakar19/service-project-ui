import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from 'src/app/routes/add-service/add-service.component';
import { ServiceProviderService } from 'src/app/services/service-provider-service/service-provider.service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private serviceproviderService: ServiceProviderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
