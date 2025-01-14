import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaludPage } from './salud.page';

describe('SaludPage', () => {
  let component: SaludPage;
  let fixture: ComponentFixture<SaludPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
