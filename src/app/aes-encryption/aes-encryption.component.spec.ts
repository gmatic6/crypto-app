import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AesEncryptionComponent } from './aes-encryption.component';

describe('AesEncryptionComponent', () => {
  let component: AesEncryptionComponent;
  let fixture: ComponentFixture<AesEncryptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AesEncryptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AesEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
