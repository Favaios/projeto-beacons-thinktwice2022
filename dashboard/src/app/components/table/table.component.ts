import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: { [key: string]: any }[] = []
  @Input() columns: {title: string, name?: string, format?: (value: any) => any, icon?: string, color?: string, modal?: string, click?: (data: any) => void}[] = []

  constructor() { }

  ngOnInit(): void {
  }

  getValue (value: any, column: {format?: (value: any) => any}) {
    return column.format ? column.format(value) : value
  }

}
