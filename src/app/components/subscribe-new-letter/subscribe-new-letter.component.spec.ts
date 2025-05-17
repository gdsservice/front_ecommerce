import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeNewLetterComponent } from './subscribe-new-letter.component';

describe('SubscribeNewLetterComponent', () => {
  let component: SubscribeNewLetterComponent;
  let fixture: ComponentFixture<SubscribeNewLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscribeNewLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeNewLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
