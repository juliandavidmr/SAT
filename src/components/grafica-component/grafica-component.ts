import { Component, Input } from '@angular/core';

/*
  Generated class for the GraficaComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'grafica-component',
  templateUrl: 'grafica-component.html',
  inputs: ['hero']
})
export class GraficaComponent {
  @Input('hero') hero: string = '';
  text: string;

  constructor() {
    console.log('Hello GraficaComponent Component', this.hero);
    this.text = 'Hello World';
  }

  ngOnInit() {
     console.log('ionViewDidLoad=>', this.hero);
  }

}
