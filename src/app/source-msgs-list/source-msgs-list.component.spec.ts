import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMsgsListComponent } from './source-msgs-list.component';

describe('SourceMsgsListComponent', () => {
  let component: SourceMsgsListComponent;
  let fixture: ComponentFixture<SourceMsgsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMsgsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMsgsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
