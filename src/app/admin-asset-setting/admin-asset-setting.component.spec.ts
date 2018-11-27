import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetSettingComponent } from './admin-asset-setting.component';

describe('AdminAssetSettingComponent', () => {
  let component: AdminAssetSettingComponent;
  let fixture: ComponentFixture<AdminAssetSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssetSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
