import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../../services/get-data.service";
import {Characters} from "../../models/character.model";
import {finalize, Observable, switchMap} from "rxjs";
import {CardBaseComponent} from "../../directives/card-base.directive";


@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent extends CardBaseComponent {
  isLoading = true;
  characterInfo$: Observable<Characters> = this.id$.pipe(
    switchMap((id: string) => {
      return this.dataService.getCharacterInfo(id).pipe(finalize(() => this.isLoading = false))
    })
  );

  constructor(private dataService: GetDataService, activatedRoute: ActivatedRoute) {
    super(activatedRoute)
  }
}
