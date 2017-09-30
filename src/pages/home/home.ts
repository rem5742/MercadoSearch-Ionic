import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	query:string = '';
	list:any = [];
	url:any = 'https://api.mercadolibre.com/sites/MCO/search?q=';
	constructor(private http:Http) {}
	onClick(e)
	{
		window.open(e.permalink, '_blank');
	}
	onInput(e)
	{
		console.log(e.target.value);
	}
	getList()
	{
		this.getProducts(this.query).then( data => {
			if (data.results)
				this.list = data.results
		});
	}
	getProducts(query:string) {
		return new Promise((resolve, reject) => {
			this.http
				.get(this.url + query)
				.map(res => res.json())
				.subscribe(
					(data) => {
						resolve(data)
					},
					(error) => {
						reject("Error: "+ error)
					})
		})
	}
}
