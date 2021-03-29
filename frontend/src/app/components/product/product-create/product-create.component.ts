import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
	selector: 'app-product-create',
	templateUrl: './product-create.component.html',
	styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
	product: Product = {
		name: '',
		price: NaN,
		isPrime: '',
	};

	constructor(private productService: ProductService, private router: Router) {}

	ngOnInit(): void {}

	isPrime: string = '';

	createProduct(): void {
		if (this.productService.confer(this.isPrime)) {
			this.product.isPrime = this.productService.confer(this.isPrime);

			this.productService.create(this.product).subscribe(() => {
				this.productService.showMessage('Operação executada com sucesso');
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
