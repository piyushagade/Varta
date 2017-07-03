import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'limitChars'})
export class LimitCharsPipe implements PipeTransform {
  transform(value: string, limit: number): any {
    return value.toString().length > limit ? value.substr(0, limit) + '...' : value;
  }
}