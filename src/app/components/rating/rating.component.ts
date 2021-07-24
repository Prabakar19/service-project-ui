import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input('rating')
  rating;
  rate: number;
  list: Array<number> = [];
  halfStar: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const decimal = this.rating % 1;
    this.halfStar = decimal > 0 ? true : false;
    this.rate = Math.floor(this.rating);
    for (let i = 1; i <= this.rate; i++) this.list.push(i);
  }
}
