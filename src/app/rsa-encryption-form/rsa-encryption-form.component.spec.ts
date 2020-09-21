import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsaEncryptionFormComponent } from './rsa-encryption-form.component';

describe('RsaEncryptionFormComponent', () => {
  let component: RsaEncryptionFormComponent;
  let fixture: ComponentFixture<RsaEncryptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsaEncryptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsaEncryptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
