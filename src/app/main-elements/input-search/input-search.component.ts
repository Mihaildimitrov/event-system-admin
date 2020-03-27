import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input() searchButtonText: string;
  @Output() startSearch = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<string>();
  value: string = '';

  constructor() { }

  ngOnInit() {}

  search() {
    this.startSearch.emit(this.value);
  }

  reset() {
    if(this.value.length) {
      this.value = '';
      this.resetSearch.emit();
    }
  }

}
