import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEditorComponent } from './select-editor.component';

describe('SelectEditorComponent', () => {
  let component: SelectEditorComponent;
  let fixture: ComponentFixture<SelectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
