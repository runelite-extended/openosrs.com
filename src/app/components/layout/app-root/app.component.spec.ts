import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Title} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

import {AppModule} from '../../../app.module';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        Title
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    //initialization
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;
  });

  describe('Component =>', () => {
    it('Should create the app', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Meta =>', () => {
    it('Shouldn\'t set the page title', () => {
      expect(TestBed.get(Title).getTitle()).toEqual('');
    });
  });

  describe('Content =>', () => {
    it('Should contain the header', () => {
      expect(element.querySelectorAll('app-header').length).toBeGreaterThanOrEqual(1);
    });

    it('Should contain the router outlet', () => {
      expect(element.querySelectorAll('router-outlet').length).toBeGreaterThanOrEqual(1);
    });

    it('Should contain the footer', () => {
      expect(element.querySelectorAll('app-footer').length).toEqual(1);
    });
  });
});
