import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items, field, searchText, searchTextMax?: any) {
    if(!items) return [];
    if(!searchText) return items;

    if(field == 'id') {
      return items.filter( u => {
        return u[field]==searchText;
      });
    } 
    else if(field == 'doj' || field == 'salary') {
      if(searchTextMax) {
        return items.filter( u => {
          return (u[field]>=searchText && u[field]<=searchTextMax)
        })
      }
      return items.filter( u => {
        return u[field]==searchText;
      });
    }
    else if(field == 'firstName' || field == 'designation') {
      searchText = searchText.toLowerCase();
      return items.filter( u => {
        return u[field].toLowerCase().includes(searchText);
      });
    }
    else if(field == 'skills') {
      searchText = searchText.toLowerCase();
      return items.filter( u => {
        return u[field].toString().toLowerCase().includes(searchText)
      });
    }
   }

}
