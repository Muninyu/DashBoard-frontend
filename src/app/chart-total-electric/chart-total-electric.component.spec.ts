import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTotalElectricComponent } from './chart-total-electric.component';

describe('ChartTotalElectricComponent', () => {
  let component: ChartTotalElectricComponent;
  let fixture: ComponentFixture<ChartTotalElectricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTotalElectricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTotalElectricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
