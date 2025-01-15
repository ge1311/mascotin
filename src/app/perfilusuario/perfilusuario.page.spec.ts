import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilusuarioPage } from './perfilusuario.page';

describe('PerfilusuarioPage', () => {
  let component: PerfilusuarioPage;
  let fixture: ComponentFixture<PerfilusuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
