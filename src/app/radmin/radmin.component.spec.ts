import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadminComponent } from './radmin.component';

describe('RadminComponent', () => {
  let component: RadminComponent;
  let fixture: ComponentFixture<RadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
