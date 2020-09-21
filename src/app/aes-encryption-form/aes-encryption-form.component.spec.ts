import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AesEncryptionFormComponent } from './aes-encryption-form.component';

describe('AesEncryptionFormComponent', () => {
  let component: AesEncryptionFormComponent;
  let fixture: ComponentFixture<AesEncryptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AesEncryptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AesEncryptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
