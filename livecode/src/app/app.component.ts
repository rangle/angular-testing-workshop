import {Component, Input} from '@angular/core';

import {ToDoService} from './services/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-do App';
  constructor(public toDoService: ToDoService) {}

  searchQueryChanged(searchString) {
    this.toDoService.searchToDos(searchString);
  }
}
