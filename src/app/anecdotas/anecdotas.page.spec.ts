import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnecdotasPage } from './anecdotas.page';

describe('AnecdotasPage', () => {
  let component: AnecdotasPage;
  let fixture: ComponentFixture<AnecdotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnecdotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
