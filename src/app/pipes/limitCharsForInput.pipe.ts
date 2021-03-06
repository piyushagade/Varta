import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitCharsForInput'})
export class LimitCharsForInputPipe implements PipeTransform {
  transform(value: string, args): any {
    if (!value) return '0' + ' / ' + args;
    else return value.length + ' / ' + args;
  }
}