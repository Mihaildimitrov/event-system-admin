import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-translations-list-item',
  templateUrl: './translations-list-item.component.html',
  styleUrls: ['./translations-list-item.component.scss']
})
export class TranslationsListItemComponent implements OnInit {

  @Input() translation: Object;

  constructor() { }

  ngOnInit() {
    
  }

}
