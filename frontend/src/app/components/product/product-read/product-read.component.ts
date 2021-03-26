import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-read',
	templateUrl: './product-read.component.html',
	styleUrls: ['./product-read.component.css'],
})
export class ProductReadComponent implements OnInit {
	products: Product[];
	displayedColumns = ['id', 'name', 'price', 'action'];

	constructor(private productService: ProductService, private router: Router) {
		this.products = [];

		this.productService.read().subscribe(products => {
			this.products = products;
			console.log(products);
		});
	}

	ngOnInit(): void {}
}
