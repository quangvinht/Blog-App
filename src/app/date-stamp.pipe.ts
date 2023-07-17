import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateStamp'
})
export class DateStampPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
