import { Component, Input } from '@angular/core';
import { IReview } from '../../models/api';

export interface IReviewListComponent {

}

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements IReviewListComponent {
  @Input() reviews: IReview[] = [];
  constructor() {}
}
