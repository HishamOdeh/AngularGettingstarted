import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  errorMessage: string = '';
  private sub!: Subscription;
  imageWidth: number = 300;
  imageMargin: number = 20;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }
               
  ngOnInit(): void {
    //--call get byId
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  getProduct(id: number): void {
    this.sub = this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
        this.pageTitle += `: ${product.productId} - ${product.description}`;
      },
      error: err => this.errorMessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
