import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycargoComponent } from './mycargo.component';

describe('MycargoComponent', () => {
  let component: MycargoComponent;
  let fixture: ComponentFixture<MycargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
