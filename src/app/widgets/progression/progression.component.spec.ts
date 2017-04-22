import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionComponent } from './progression.component';

describe('ProgressionComponent', () => {
  let component: ProgressionComponent;
  let fixture: ComponentFixture<ProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
