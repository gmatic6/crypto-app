import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigZagComponent } from './zig-zag.component';

describe('ZigZagComponent', () => {
  let component: ZigZagComponent;
  let fixture: ComponentFixture<ZigZagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZigZagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZigZagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
