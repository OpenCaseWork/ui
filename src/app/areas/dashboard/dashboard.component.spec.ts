/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { RouterTestingModule  } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardComponent } from './dashboard.component';

@Component( {
  template: ''
})
class DummyComponent {

}


xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ DashboardComponent, DummyComponent ],
    imports: [ RouterTestingModule.withRoutes([
        { path: 'home', component: DummyComponent }
    ])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
