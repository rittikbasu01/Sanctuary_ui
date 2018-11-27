import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleSettingsComponent } from './admin-role-settings.component';

describe('AdminRoleSettingsComponent', () => {
  let component: AdminRoleSettingsComponent;
  let fixture: ComponentFixture<AdminRoleSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
