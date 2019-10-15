import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModelManagerComponent } from './shared-model-manager.component';

describe('SharedModelManagerComponent', () => {
  let component: SharedModelManagerComponent;
  let fixture: ComponentFixture<SharedModelManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedModelManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedModelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
