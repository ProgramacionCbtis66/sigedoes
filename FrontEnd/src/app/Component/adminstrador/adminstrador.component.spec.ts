import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstradorComponent } from './adminstrador.component';

describe('AdminstradorComponent', () => {
  let component: AdminstradorComponent;
  let fixture: ComponentFixture<AdminstradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminstradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminstradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
