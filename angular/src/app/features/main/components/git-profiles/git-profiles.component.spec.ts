import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitProfilesComponent } from './git-profiles.component';

describe('GitProfilesComponent', () => {
  let component: GitProfilesComponent;
  let fixture: ComponentFixture<GitProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
