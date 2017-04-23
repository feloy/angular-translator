import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluralEditorComponent } from './plural-editor.component';

describe('PluralEditorComponent', () => {
  let component: PluralEditorComponent;
  let fixture: ComponentFixture<PluralEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluralEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluralEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
