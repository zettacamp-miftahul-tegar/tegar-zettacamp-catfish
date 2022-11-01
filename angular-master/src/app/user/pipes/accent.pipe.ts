import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'accent'
})
export class AccentPipe implements PipeTransform {

  transform(value: string): string {
    let aksenz:string[] = value.split('');

    aksenz = aksenz.map(char => {
      const splited = char.normalize('NFD').split('');
      return splited[0]
    })
    return aksenz.join('');
  }
}

// ['t','e`','g','a`','r']
// ['t','e','`','g','a`','r']
