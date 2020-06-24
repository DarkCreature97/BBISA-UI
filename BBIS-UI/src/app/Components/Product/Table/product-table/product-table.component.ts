import { GETProduct } from './../../../../Models/product.model';
import { ProductService } from './../../../../Services/Product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  displayColumns = ['productID', 'brand', 'flavour', 'alcoholic', 'containerType', 'returnable', 'stockAmount', 'sellPrice', 'discount'];
  dataSource: MatTableDataSource<GETProduct>;
  selection = new SelectionModel<GETProduct>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<GETProduct>();
    this.fillTable();
    this.dataSource.sort = this.sort;

    this.productService.redoGet.subscribe(() =>{
      this.dataSource = new MatTableDataSource<GETProduct>();
      this.fillTable();
    });
  }

  fillTable(){
    this.dataSource.paginator = this.paginator;
    this.productService.getProductList().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export class ProductDataSource extends DataSource<any> {

  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<GETProduct[]>{
    return this.productService.getProductList();
  }

  disconnect() {}
}
