import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModelDialogComponent } from './shared-model-dialog.component';

describe('SharedModelDialogComponent', () => {
  let component: SharedModelDialogComponent;
  let fixture: ComponentFixture<SharedModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
