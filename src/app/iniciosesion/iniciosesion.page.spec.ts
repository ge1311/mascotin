import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciosesionPage } from './iniciosesion.page';

describe('IniciosesionPage', () => {
  let component: IniciosesionPage;
  let fixture: ComponentFixture<IniciosesionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciosesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
