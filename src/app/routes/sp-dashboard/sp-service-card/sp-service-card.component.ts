import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyServiceComponent } from 'src/app/routes/sp-dashboard/modify-service/modify-service.component';
import { DeleteServiceComponent } from 'src/app/routes/sp-dashboard/delete-service/delete-service.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/state';
import { setLoading } from 'src/app/state/shared/shared.actions';
import { removeService } from '../state/sp-dashboard.actions';

@Component({
  selector: 'app-sp-service-card',
  templateUrl: './sp-service-card.component.html',
  styleUrls: ['./sp-service-card.component.scss'],
})
export class SpServiceCardComponent implements OnInit {
  @Input() service: Service;
  @Input() button: boolean;
  retrievedImage: string;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrievedImage = 'data:image/jpeg;base64,' + this.service.servicePic;
  }

  calculateCost(cost: number, discount: number): number {
    return Math.round(cost - (discount / 100) * cost);
  }

  editService() {
    const dialogRef = this.dialog.open(ModifyServiceComponent, {
      data: this.service,
    });
  }

  deleteService() {
    const dialogRef = this.dialog.open(DeleteServiceComponent, {
      data: this.service,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(setLoading({ status: true }));
        this.store.dispatch(removeService({ serviceId: this.service.serviceId }));
      }
    });
  }
}
