import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmaFormComponent } from './enigma-form.component';

describe('EnigmaFormComponent', () => {
  let component: EnigmaFormComponent;
  let fixture: ComponentFixture<EnigmaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
