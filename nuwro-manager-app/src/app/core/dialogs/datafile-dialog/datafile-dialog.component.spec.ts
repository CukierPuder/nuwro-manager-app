import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafileDialogComponent } from './datafile-dialog.component';

describe('DatafileDialogComponent', () => {
  let component: DatafileDialogComponent;
  let fixture: ComponentFixture<DatafileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
