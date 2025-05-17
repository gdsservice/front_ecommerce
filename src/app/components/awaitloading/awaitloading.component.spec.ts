import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitloadingComponent } from './awaitloading.component';

describe('AwaitloadingComponent', () => {
  let component: AwaitloadingComponent;
  let fixture: ComponentFixture<AwaitloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwaitloadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
