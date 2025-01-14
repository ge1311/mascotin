import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenasPage } from './resenas.page';

describe('ResenasPage', () => {
  let component: ResenasPage;
  let fixture: ComponentFixture<ResenasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
