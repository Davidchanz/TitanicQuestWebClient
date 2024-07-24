import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkPanelComponent } from './ok-panel.component';

describe('OkPanelComponent', () => {
  let component: OkPanelComponent;
  let fixture: ComponentFixture<OkPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OkPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
