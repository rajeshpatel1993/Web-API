import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HshopComponent } from './hshop.component';

describe('HshopComponent', () => {
  let component: HshopComponent;
  let fixture: ComponentFixture<HshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
