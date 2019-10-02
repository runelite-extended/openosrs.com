import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AppModule } from '../../../app.module';

import { AppHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
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

  beforeEach(async () => {
    // initialization
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;

    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('Component =>', () => {
    it('Should create the header', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Content =>', () => {
    it('Should have the RL+ title', () => {
      expect(element.querySelector('.title > span').innerHTML.trim()).toEqual('OpenOSRS');
    });

    it('Should have the desktop menu', () => {
      expect(element.querySelectorAll('mat-toolbar-row:nth-of-type(1) > button').length).toEqual(3);
    });

    it('Should have the mobile options', () => {
      expect(element.querySelectorAll('.mobile-nav > button').length).toEqual(3);
    });

    it('Should push content', () => {
      expect(element.querySelectorAll('.spacer').length).toEqual(1);
    });

    it('Should contain four material icon tags', () => {
      expect(element.querySelectorAll('mat-icon').length).toEqual(4);
    });
  });
});
