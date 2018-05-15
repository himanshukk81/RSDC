import { Component } from '@angular/core';

/**
 * Generated class for the TrainingDetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'training-detail',
  templateUrl: 'training-detail.html'
})
export class TrainingDetailComponent {

  text: string;

  constructor() {
    console.log('Hello TrainingDetailComponent Component');
    this.text = 'Hello World';
  }

}
