import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {finalize, Observable, switchMap} from "rxjs";
import {GetDataService} from "../../services/get-data.service";
import {Episodes} from "../../models/episodes.model";
import {CardBaseComponent} from "../../directives/card-base.directive";

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeCardComponent extends CardBaseComponent {
  isLoading = true;
  episodeInfo$: Observable<Episodes> = this.id$.pipe(
    switchMap((id: string) => {
      return this.dataService.getEpisodeInfo(id).pipe(finalize(() => this.isLoading = false))
    })
  );

  constructor(private dataService: GetDataService, activatedRoute: ActivatedRoute) {
    super(activatedRoute)
  }
}
