import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigZagFormComponent } from './zig-zag-form.component';

describe('ZigZagFormComponent', () => {
  let component: ZigZagFormComponent;
  let fixture: ComponentFixture<ZigZagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZigZagFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigZagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
