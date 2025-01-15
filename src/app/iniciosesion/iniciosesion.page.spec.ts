import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioSesionPage } from './iniciosesion.page';

describe('IniciosesionPage', () => {
  let component: InicioSesionPage;
  let fixture: ComponentFixture<InicioSesionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
