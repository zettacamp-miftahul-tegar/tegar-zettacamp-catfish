import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'combine'
})
export class CombinePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\s/g,'').toLocaleLowerCase();
  }

}