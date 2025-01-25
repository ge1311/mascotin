import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudArticulosPage } from './crud-articulos.page';

describe('CrudArticulosPage', () => {
  let component: CrudArticulosPage;
  let fixture: ComponentFixture<CrudArticulosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
