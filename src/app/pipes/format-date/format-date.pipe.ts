import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'appFormatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(date: string, format: string = 'll') {
    return moment(date).format(format);
  }
}
