import {Pipe, PipeTransform} from '@angular/core';
import {ListItemType} from "../../list/lists/lists.component";

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: ListItemType[], searchName: string): any {
    if (!searchName) {
      return list;
    }

    return list.filter((listElement) => listElement.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  }
}
