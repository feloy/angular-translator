import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgEditComponent } from './msg-edit.component';

describe('MsgEditComponent', () => {
  let component: MsgEditComponent;
  let fixture: ComponentFixture<MsgEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
