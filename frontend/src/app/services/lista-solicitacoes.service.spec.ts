import { TestBed } from '@angular/core/testing';

import { ListaSolicitacoesService } from './lista-solicitacoes.service';

describe('ListaSolicitacoesService', () => {
  let service: ListaSolicitacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSolicitacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
