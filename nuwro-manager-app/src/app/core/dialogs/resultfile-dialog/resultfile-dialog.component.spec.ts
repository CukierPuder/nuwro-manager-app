import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultfileDialogComponent } from './resultfile-dialog.component';

describe('ResultfileDialogComponent', () => {
  let component: ResultfileDialogComponent;
  let fixture: ComponentFixture<ResultfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
