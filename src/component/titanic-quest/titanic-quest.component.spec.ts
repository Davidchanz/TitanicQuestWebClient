import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitanicQuestComponent } from './titanic-quest.component';

describe('TitanicQuestComponent', () => {
  let component: TitanicQuestComponent;
  let fixture: ComponentFixture<TitanicQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitanicQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitanicQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
