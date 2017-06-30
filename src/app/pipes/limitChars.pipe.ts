import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitChars'})
export class LimitCharsPipe implements PipeTransform {
  transform(value: string, args: string): any {
    if (!value) return '0' + ' / ' + args;
    else return value.length + ' / ' + args;
  }
}