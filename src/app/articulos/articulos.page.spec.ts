import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticulosPage } from './articulos.page';

describe('ArticulosPage', () => {
  let component: ArticulosPage;
  let fixture: ComponentFixture<ArticulosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
