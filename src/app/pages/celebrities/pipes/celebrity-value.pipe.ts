import { Pipe, PipeTransform } from '@angular/core';

import { ECelebrityProps } from '../enums/celebrities.enum';

@Pipe({
  name: 'celebrityValue',
})
export class CelebrityValuePipe implements PipeTransform {

  transform(value: string | string[], column: ECelebrityProps): string {
    if (Array.isArray(value)) {
      return value.join(',\n');
    }
    if (column === ECelebrityProps.BirthDate) {
      return new Date(value).toLocaleDateString();
    }
    return value;
  }

}
