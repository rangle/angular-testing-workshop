import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ToDoService {

  private toDoItems = [];
  public searchTerm$ = new BehaviorSubject('');
  public toDoItems$ = new BehaviorSubject(this.toDoItems);

  public filteredToDoItems$ = this.searchTerm$
    .switchMap(searchTerm => {
      return this.toDoItems$.map(items => {
        return items.filter(item => {
          return item.description.includes(searchTerm);
        });
      });
    });

  constructor(private apiService: ApiService) {
    apiService.get('todos').subscribe(todos => this.toDoItems$.next(todos));
  }

  addToDo(description) {
    this.apiService.add('todos', {description}).subscribe(items => {
      this.toDoItems = items;
      this.toDoItems$.next(this.toDoItems);
    });
  }

  searchToDos(searchString) {
    this.searchTerm$.next(searchString);
  }


}
