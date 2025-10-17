import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresComponent } from './autores';

describe('Autores', () => {
  let component: AutoresComponent;
  let fixture: ComponentFixture<AutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
