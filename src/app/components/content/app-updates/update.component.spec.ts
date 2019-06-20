import { DebugElement } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { MatBottomSheet } from '@angular/material';

import { UpdatesModule } from './updates.module';

import { AppUpdatesComponent } from './updates.component';

import { NotificationService } from '../../../services/notification.service';
import { GoogleAnalyticsService } from '../../../services/google.analytics.service';

import { of } from 'rxjs';
import { UpdatesJsonService } from '../../../services/updates.service';
import { GithubService } from '../../../services/github.service';

const update = {
  date: '2019-05-23T00:00:00Z',
  title: 'RuneLite+ has been updated to 1.3!',
  mdFile: 'runelite-plus-update-1.3',
  categories: [
    'updates'
  ],
  tags: [
    'changes',
    'plugins',
    'runelite 1.5'
  ]
};

describe('UpdatesComponent', () => {
  let component: AppUpdatesComponent;
  let fixture: ComponentFixture<AppUpdatesComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  let updateSpy: jasmine.Spy;
  let githubSpy: jasmine.Spy;

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
            params: of({ name: 'runelite-plus-update-1.3' })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    // initialization
    fixture = TestBed.createComponent(AppUpdatesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = de.nativeElement;

    updateSpy = spyOn(de.injector.get(UpdatesJsonService), 'getJSON').and.callThrough();
    githubSpy = spyOn(de.injector.get(GithubService), 'getCommits').and.callThrough();

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
      expect(TestBed.get(Title).getTitle()).toEqual('Runelite Plus: Updates');
    }));
  });

  describe('Content =>', () => {
    it('Should Set the header title to \'Updates\'', () => {
      expect(element.querySelector('.content-header span:nth-child(1)').innerHTML.trim()).toEqual('Updates');
    });

    it('Should fetch update posts', () => {
      expect(updateSpy).toHaveBeenCalled();
    });

    it('Should fetch github commits', () => {
      expect(githubSpy).toHaveBeenCalled();
    });
  });

  describe('Actions =>', () => {
    it('Should open the share sheet when clicking share', () => {
      const bottomsheetSpy = spyOn(component, 'openBottomSheet').and.callThrough();

      component.openBottomSheet(update);

      expect(bottomsheetSpy).toHaveBeenCalled();
    });

    it('Should notify when bottom sheet return {data: copy}', () => {
      const notificationService = spyOn(de.injector.get(NotificationService), 'showError').and.callThrough();
      spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue({
        afterDismissed: () => of({ data: 'copy' })
      });

      component.openBottomSheet(update);

      expect(notificationService).toHaveBeenCalledTimes(1);
    });

    it('Should send a GA event when closing the bottom sheet', () => {
      spyOn(TestBed.get(MatBottomSheet), 'open').and.returnValue({
        afterDismissed: () => of({})
      });

      const googleAnalyticsService = spyOn(de.injector.get(GoogleAnalyticsService), 'event').and.callThrough();

      component.openBottomSheet(update);

      expect(googleAnalyticsService).toHaveBeenCalledTimes(1);
    });
  });
});
