import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerServices } from 'src/app/services/customer-service/customer.service';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service-service/service.service';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styleUrls: ['./delete-service.component.css'],
})
export class DeleteServiceComponent implements OnInit {
  service: Service;
  errorMessage: string = '';
  hide: boolean;
  spServiceId: number;

  deleteServiceForm = this.fb.group({});

  constructor(private serviceService: ServiceService, private http: HttpClient, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.spServiceId = JSON.parse(sessionStorage.getItem('spServiceId'));
  }

  deleteService() {
    if (this.deleteServiceForm.valid) {
      console.log(this.spServiceId);
      this.serviceService.deleteServiceRequest(this.deleteServiceForm.value, this.spServiceId).subscribe(
        (res) => {
          this.service = res;
          this.deleteServiceForm.reset;
          localStorage.setItem('isLoggedInSP', 'true');
        },
        (error) => {
          if (typeof error.error == typeof 'string') this.errorMessage = error.error;
        }
      );
      window.location.reload();
    }
  }
}
