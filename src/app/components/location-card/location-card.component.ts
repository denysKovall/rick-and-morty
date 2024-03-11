import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardBaseComponent} from "../../directives/card-base.directive";
import {finalize, Observable, switchMap} from "rxjs";
import {Locations} from "../../models/locations.model";
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../../services/get-data.service";

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCardComponent extends CardBaseComponent {
  isLoading = true;
  locationInfo$: Observable<Locations> = this.id$.pipe(
    switchMap((id: string) => {
      return this.dataService.getLocationInfo(id).pipe(finalize(() => this.isLoading = false))
    })
  );

  constructor(private dataService: GetDataService, activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}
