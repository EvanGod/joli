import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PensionesPage } from './pensiones.page';

describe('PensionesPage', () => {
  let component: PensionesPage;
  let fixture: ComponentFixture<PensionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
