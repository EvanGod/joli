import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropuestaPage } from './propuesta.page';

describe('PropuestaPage', () => {
  let component: PropuestaPage;
  let fixture: ComponentFixture<PropuestaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
