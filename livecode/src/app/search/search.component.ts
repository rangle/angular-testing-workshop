import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() queryChanged = new EventEmitter<string>();

  private searchTerms = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.searchTerms
      .distinctUntilChanged()
      .debounceTime(300)
      .subscribe(searchString => this.queryChanged.emit(searchString));
  }

  onInput(searchString) {
    this.searchTerms.next(searchString);
    // this.queryChanged.emit(searchString);
  }

}
