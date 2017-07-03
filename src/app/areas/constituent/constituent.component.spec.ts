import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituentComponent } from './constituent.component';

describe('ConstituentComponent', () => {
  let component: ConstituentComponent;
  let fixture: ComponentFixture<ConstituentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstituentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstituentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
