import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherListItemComponent } from './weather-list-item.component';

describe('WeatherListItemComponent', () => {
  let component: WeatherListItemComponent;
  let fixture: ComponentFixture<WeatherListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
