import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';

import {AppModule} from '../../../app.module';

import {AppFooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async() => {
    //initialization
    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;

    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('Component =>', () => {
    it('Should create the footer', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Content =>', () => {
    it('Should stub...', () => {
      expect(true).toBeTruthy();
    });
  });
});
