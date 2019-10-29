import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultfileManagerComponent } from './resultfile-manager.component';

describe('ResultfileManagerComponent', () => {
  let component: ResultfileManagerComponent;
  let fixture: ComponentFixture<ResultfileManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultfileManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultfileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
