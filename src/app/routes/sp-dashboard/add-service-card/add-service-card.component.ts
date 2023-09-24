import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from 'src/app/routes/sp-dashboard/add-service-card/add-service/add-service.component';

@Component({
  selector: 'app-add-service-card',
  templateUrl: './add-service-card.component.html',
  styleUrls: ['./add-service-card.component.scss'],
})
export class AddServiceCardComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addService() {
    const dialogRef = this.dialog.open(AddServiceComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
