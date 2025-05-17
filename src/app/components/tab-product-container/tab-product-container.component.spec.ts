import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProductContainerComponent } from './tab-product-container.component';

describe('TabProductContainerComponent', () => {
  let component: TabProductContainerComponent;
  let fixture: ComponentFixture<TabProductContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabProductContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProductContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
