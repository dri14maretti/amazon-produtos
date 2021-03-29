import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';

@Component({
	selector: 'app-product-update',
	templateUrl: './product-update.component.html',
	styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
	product: Product;

	constructor(
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.product = {
			name: '',
			price: NaN,
			isPrime: '',
		};
	}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.productService.readById(Number(id)).subscribe((product: Product) => {
			this.product = product;
			console.log(product.isPrime);
		});
	}

	updateProduct(): void {
		if (this.productService.confer(this.product.isPrime)) {
			this.product.isPrime = this.productService.confer(this.product.isPrime);

			this.productService.update(this.product).subscribe(() => {
				this.productService.showMessage('Produto editado com sucesso');
				this.router.navigate(['/products']);
			});
		} else {
			this.productService.showMessage('Favor Digitar "Sim" ou "Não"', true);
		}
	}

	cancel(): void {
		this.router.navigate(['/products']);
	}
}
