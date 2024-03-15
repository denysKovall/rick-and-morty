import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {CardBaseComponent} from "./card-base.directive";
import {Component} from "@angular/core";
import {customOptions} from "../carousel-settings/carousel-settings";

// Mock component extending CardBaseComponent for testing purposes
@Component({
    template: ''
})
class TestComponent extends CardBaseComponent {
    // TestComponent extends CardBaseComponent to make its functionality testable
}

describe('CardBaseComponent', () => {
    let component: CardBaseComponent;
    let activatedRoute: ActivatedRoute;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        params: of({id: '123'}),
                    }
                },
                TestComponent
            ]
        });

        component = TestBed.inject(TestComponent);
        activatedRoute = TestBed.inject(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should create and fetch the route param id', () => {
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        component.id$.subscribe((id) => {
            expect(id).toBe('123');
        });
    });
        it('should correctly fetch the route param id', (done) => {
            component.id$.subscribe(id => {
                expect(id).toBe('123');
                done();
            });
        });

        it('should have customOptions assigned from imported settings', () => {
            expect(component['customOptions']).toEqual(customOptions);
        });
});
