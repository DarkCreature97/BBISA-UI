import { ProgressBarService } from './../../../../Services/progress-bar.service';
import { ProductService } from './../../../../Services/Product/product.service';
import { SellService } from './../../../../Services/Sell/sell.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-delete',
  templateUrl: './sell-delete.component.html',
  styleUrls: ['./sell-delete.component.css'],
})
export class SellDeleteComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private sellService: SellService,
    private productService: ProductService,
    private progBarService: ProgressBarService
  ) {}

  deleteSell = new FormGroup({
    sellID: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {}

  //#region
  onSubmit() {
    this.progBarService.runProgressBar.next(true);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: this.deleteSell.value['orderID'],
    };

    this.http.delete('https://bbisa.azurewebsites.net/api/Sell/EliminateSell', httpOptions).subscribe(
      (result) => {
        this._snackBar.open(result['value'], 'Dismiss', {
          duration: 2000,
          panelClass: ['success-snackbar'],
        });

        this.sellService.redoGet.next();
        this.productService.redoGet.next();
        this.progBarService.runProgressBar.next(false);
      },
      (error) => {
        var message = error.error['value'];

        if (error.status == 400) {
          message = 'One or more validation errors';
        }

        this._snackBar.open(message, 'Dismiss', {
          duration: 6000,
          panelClass: ['fail-snackbar'],
        });

        this.progBarService.runProgressBar.next(false);
      }
    );
  }
  //#endregion

  //#region Validation
  getErrorMessage(fieldName: string) {
    var field = this.deleteSell.get(fieldName);
    var required = 'Field is required';
    var maxLength = fieldName + ' has hit its max length';

    if (field.hasError('required')) return required;

    // if (field.hasError('max')) return maxLength;

    return 'Error in validation';
  }

  validateField(fieldName: string) {
    return this.deleteSell.get(fieldName);
  }
  //#endregion
}
