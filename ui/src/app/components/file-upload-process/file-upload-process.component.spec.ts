import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProcessComponent } from './file-upload-process.component';

describe('FileUploadProcessComponent', () => {
  let component: FileUploadProcessComponent;
  let fixture: ComponentFixture<FileUploadProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileUploadProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
