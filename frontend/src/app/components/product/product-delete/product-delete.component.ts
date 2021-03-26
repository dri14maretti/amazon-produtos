import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from './../product.model';

@Component({
	selector: 'app-product-delete',
	templateUrl: './product-delete.component.html',
	styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
	product: Product;

	constructor(
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.product = {
			name: '',
			price: NaN,
		};

		const id = this.route.snapshot.paramMap.get('id');
		this.productService.readById(Number(id)).subscribe((product: Product) => {
			this.product = product;
		});
	}

	ngOnInit(): void {}

	deleteProduct(): void {
		this.productService.delete(`${this.product.id}`).subscribe(() => {
			this.productService.showMessage('Produto excluído com sucesso!');
			this.router.navigate(['/products']);
		});
	}

	cancel(): void {
		this.router.navigate(['/products']);
	}
}
