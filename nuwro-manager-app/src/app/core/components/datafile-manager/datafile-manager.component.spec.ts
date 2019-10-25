import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafileManagerComponent } from './datafile-manager.component';

describe('DatafileManagerComponent', () => {
  let component: DatafileManagerComponent;
  let fixture: ComponentFixture<DatafileManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafileManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
