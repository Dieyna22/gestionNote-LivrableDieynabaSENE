import { TestBed } from '@angular/core/testing';

import { GestionNotesService } from './gestion-notes.service';

describe('GestionNotesService', () => {
  let service: GestionNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
