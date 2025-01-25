import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCategoriaPage } from './crear-categoria.page';

describe('CrearCategoriaPage', () => {
  let component: CrearCategoriaPage;
  let fixture: ComponentFixture<CrearCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
