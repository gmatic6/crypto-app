import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaesarCipherFormComponent } from './caesar-cipher-form.component';

describe('CaesarCipherFormComponent', () => {
  let component: CaesarCipherFormComponent;
  let fixture: ComponentFixture<CaesarCipherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaesarCipherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaesarCipherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
