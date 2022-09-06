import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  transform(value: any[], separator?: string): unknown {
    return value?.length ? value?.map((v) => " " + v + " ")?.join(separator || ",") : "";
  }
}
