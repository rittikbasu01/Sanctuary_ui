import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginSettingComponent } from './admin-login-setting.component';

describe('AdminLoginSettingComponent', () => {
  let component: AdminLoginSettingComponent;
  let fixture: ComponentFixture<AdminLoginSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoginSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
