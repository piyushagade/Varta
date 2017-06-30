import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dashify'})
export class DashifyPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return 'N/A';

    return value.toLowerCase().replace(/\s/g, "-");
  }
}