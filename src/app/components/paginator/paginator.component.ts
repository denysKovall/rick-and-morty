import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input() totalCount = 0;
  @Input() pagination!: Pagination;
  @Input() pageSizeOptions!: Array<number>;
  @Output() emitPageEvent = new EventEmitter<PageEvent>();

  onPageEvent(pageEvent: PageEvent): void {
    this.emitPageEvent.emit(pageEvent);
  }
}
