import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  rates: any[];
  // baseCurrency: string = "";
  // targetCurrency:['USA', 'EUR', 'CNY'];
  value: number;
  form : FormGroup;
  @Input() inputBase: number;
  inputConvert: number;
  outputConvert: number;
  constructor(private httpClient: HttpClient, private fb: FormBuilder) { 
    this.form = this.fb.group({
      rates: '',
      base: 0,
    });
  }

  ngOnInit(): void {
    this.loadCurrency()
    console.log(this.rates)
  }

  loadCurrency(){
    this.rates = [];
    this.httpClient.get("https://api.exchangeratesapi.io/latest?symbols=USD&base=THB").subscribe(result => {
      this.rates = result["rates"];    
      console.log(this.rates['USD'].toFixed(4));
    });
  }

  convert(base:number){
    this.inputBase = Math.abs(base);
    this.rates = [];
    this.httpClient.get("https://api.exchangeratesapi.io/latest?symbols=USD&base=THB").subscribe(result => {
      this.rates = result["rates"];    
      this.value = result["rates"]["USD"];
    this.inputConvert = Math.abs(this.rates['USD'].toFixed(4))
    this.value = Math.abs(this.inputConvert*this.inputBase)
    console.log(this.inputBase)
    console.log(this.inputConvert)
    console.log(this.value)
    });
  
  }

}
