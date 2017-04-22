import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameSidenavComponent } from './frame-sidenav.component';

describe('FrameSidenavComponent', () => {
  let component: FrameSidenavComponent;
  let fixture: ComponentFixture<FrameSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
