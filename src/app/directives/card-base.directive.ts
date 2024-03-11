import {Directive} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";
import {customOptions} from "../carousel-settings/carousel-settings";
import {map, Observable} from "rxjs";

@Directive()

export class CardBaseComponent {
  id$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['id'])
  );
  protected customOptions: OwlOptions = customOptions;

  constructor(private activatedRoute: ActivatedRoute) {
  }
}
