import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

import {UpdatesModule} from '../updates.module';

import {ShareUpdateComponent} from './share.update.component';

describe('ShareUpdateComponent', () => {
  let component: ShareUpdateComponent;
  let fixture: ComponentFixture<ShareUpdateComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  const mockBottomSheetRef = {
    dismiss: jasmine.createSpy('dismiss')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UpdatesModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: MatBottomSheetRef,
          useValue: mockBottomSheetRef
        },
        {
          provide: MAT_BOTTOM_SHEET_DATA,
          useValue:
            {
              "update": {
                "date": "2019-05-23T00:00:00Z",
                "title": "RuneLite+ has been updated to 1.3!",
                "mdFile": "runelite-plus-update-1.3",
                "categories": [
                  "updates"
                ],
                "tags": [
                  "changes",
                  "plugins",
                  "runelite 1.5"
                ]
              }
            }
        },
        {
          provide: Window,
          useValue: {
            'ga': null
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async() => {
    //initialization
    fixture = TestBed.createComponent(ShareUpdateComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;

    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('Component =>', () => {
    it('Should create the share menu', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Content =>', () => {
    it('Should have the share list', () => {
      expect(element.querySelectorAll('mat-nav-list').length).toEqual(1);
    });

    it('Should have five items', () => {
      expect(element.querySelectorAll('mat-nav-list > a').length).toEqual(5);
    });

    it('Should have five material icon tags', () => {
      expect(element.querySelectorAll('mat-nav-list mat-icon').length).toEqual(5);
    });

    it('Should have ten span tags (2 per icon)', () => {
      expect(element.querySelectorAll('span').length).toEqual(10);
    });

    it('Should have Facebook as first button', () => {
      expect(element.querySelectorAll('mat-nav-list > a')[0].querySelector('span').innerHTML.trim()).toEqual("Facebook");
    });

    it('Should have Twitter as second button', () => {
      expect(element.querySelectorAll('mat-nav-list > a')[1].querySelector('span').innerHTML.trim()).toEqual("Twitter");
    });

    it('Should have e-mail as third button', () => {
      expect(element.querySelectorAll('mat-nav-list > a')[2].querySelector('span').innerHTML.trim()).toEqual("E-mail");
    });

    it('Should have copy as fourth button', () => {
      expect(element.querySelectorAll('mat-nav-list > a')[3].querySelector('span').innerHTML.trim()).toEqual("Copy");
    });

    it('Should have close as the last button', () => {
      expect(element.querySelectorAll('mat-nav-list > a')[4].querySelector('span').innerHTML.trim()).toEqual("Close");
    });

    describe('Actions =>', () => {
      it('Should close the bottom sheet when close function is called', () => {
        const mouseEvent = new MouseEvent('mouseEvent');
        const spy = spyOn(mouseEvent, 'preventDefault');

        component.close(mouseEvent);
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
      });

      it('Should close the bottom sheet when copying function is called', () => {
        const mouseEvent = new MouseEvent('mouseEvent');
        const spy = spyOn(mouseEvent, 'preventDefault');

        component.copyLink(mouseEvent);
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
      });

      it('Should close the bottom sheet when share function is called (Facebook)', () => {
        const mouseEvent = new MouseEvent('mouseEvent');
        const spy = spyOn(mouseEvent, 'preventDefault');

        component.openLink(1);
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(0);
      });

      it('Should close the bottom sheet when share function is called (Twitter)', () => {
        const mouseEvent = new MouseEvent('mouseEvent');
        const spy = spyOn(mouseEvent, 'preventDefault');

        component.openLink(2);
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(0);
      });

      it('Should close the bottom sheet when share function is called (Twitter)', () => {
        const mouseEvent = new MouseEvent('mouseEvent');
        const spy = spyOn(mouseEvent, 'preventDefault');

        component.openLink(Infinity);
        expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
