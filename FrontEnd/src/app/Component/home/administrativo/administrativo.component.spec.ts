import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoComponent } from './administrativo.component';

describe('AdministrativoComponent', () => {
  let component: AdministrativoComponent;
  let fixture: ComponentFixture<AdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
