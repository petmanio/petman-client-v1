import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'appFromNow' })
export class FromNowPipe implements PipeTransform {
  transform(date: string) {
    return moment(date).fromNow()
  }
}
