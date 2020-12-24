import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

	@Input() category: string

	errorMessage = undefined;
	ds = undefined
	lastUpdated;

  constructor(public products: ProductsService ) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  	if(changes.category) {
		this.ds = undefined;
		this.errorMessage = undefined;
		this.products.getProducts(this.category).then((res) => {
			this.ds = res.categories
			this.lastUpdated = res.updated;
		}).catch(err => {
			this.errorMessage = "Fetching category failed";
			console.error(err)
		});
	}
  }


}
