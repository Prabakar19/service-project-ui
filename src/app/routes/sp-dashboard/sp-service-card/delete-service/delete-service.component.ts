import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-service',
  templateUrl: './delete-service.component.html',
  styles: [
    `
      .btn-grp {
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
      }
    `,
  ],
})
export class DeleteServiceComponent implements OnInit {
  data = true;
  ngOnInit(): void {}
}
