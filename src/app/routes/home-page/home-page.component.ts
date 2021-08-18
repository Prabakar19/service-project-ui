import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category-service/category-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  pageLoaded: boolean = false;
  categoryList: Category[];
  categoryNameList: string[];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategoryListRequest().subscribe(
      (res) => {
        this.categoryList = res;
        this.categoryNameList = this.categoryList.map((cat) => cat.categoryName);
        this.pageLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectedDataHandler(event) {
    this.router.navigateByUrl('/login');
  }

  goListPage(cat: Category) {
    this.router.navigateByUrl('/login');
  }
}
