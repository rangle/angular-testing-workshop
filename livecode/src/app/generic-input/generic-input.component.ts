import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css']
})
export class GenericInputComponent implements OnInit {
  @Output() newItem: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }

  addToDo(text: HTMLInputElement) {
    this.newItem.emit(text.value);
    text.value = '';
  }

}
