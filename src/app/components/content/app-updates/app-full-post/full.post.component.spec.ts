import {DebugElement} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {MatBottomSheet} from '@angular/material';

import {UpdatesModule} from '../updates.module';

import {AppFullPostComponent} from './full.post.component';
import {NotificationService} from '../../../../services/notification.service';
import {GoogleAnalyticsService} from '../../../../services/google.analytics.service';

import {of} from 'rxjs';

describe('FullPostComponent', () => {
  let component: AppFullPostComponent;
  let fixture: ComponentFixture<AppFullPostComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        UpdatesModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({name: "runelite-plus-update-1.3"})
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async() => {
    //initialization
    fixture = TestBed.createComponent(AppFullPostComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;

    component.update = {
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
    };

    await fixture.whenStable();
    fixture.detectChanges();
  });

  describe('Component =>', () => {
    it('Should create the full post page', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Meta =>', () => {
    it('Should set the page title', fakeAsync(() => {
      expect(TestBed.get(Title).getTitle()).toEqual('Runelite Plus: RuneLite+ has been updated to 1.3!');
    }));
  });

  describe('Content =>', () => {
    it('Should Set the header title to \'RuneLite+ has been updated to 1.3!\'', () => {
      expect(element.querySelector('.content-header span:nth-child(1)').innerHTML.trim()).toEqual('RuneLite+ has been updated to 1.3!');
    });
  });

  describe('Actions =>', () => {
    it('Should open the share sheet when clicking share', () => {
      let bottomsheetSpy = spyOn(component, 'openBottomSheet').and.callThrough();

      component.openBottomSheet(component.update);

      expect(bottomsheetSpy).toHaveBeenCalled();
    });

    it('Should notify when bottom sheet return {data: copy}', () => {
      const notificationService = spyOn(de.injector.get(NotificationService), 'showError').and.callThrough();
      spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue({
        afterDismissed: () => of({data: 'copy'})
      });

      component.openBottomSheet(component.update);

      expect(notificationService).toHaveBeenCalledTimes(1);
    });

    it('Should send a GA event when closing the bottom sheet', () => {
      spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue({
        afterDismissed: () => of({})
      });

      const googleAnalyticsService = spyOn(de.injector.get(GoogleAnalyticsService), 'event').and.callThrough();

      component.openBottomSheet(component.update);

      expect(googleAnalyticsService).toHaveBeenCalledTimes(1);
    });
  });
});
