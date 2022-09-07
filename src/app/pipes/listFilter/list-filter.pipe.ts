import {Pipe, PipeTransform} from '@angular/core';
import {ListItemType} from "../../lists/lists.component";

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: ListItemType[], searchName: string): any {
    if (list.length === 0 || !searchName) {
      return list;
    }

    return list.filter((listElement) => listElement.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  }
}
