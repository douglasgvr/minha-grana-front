import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  contaCasalId: string = '';

  // Modal
  mostrarModal: boolean = false;
  abrirModal() {
    this.mostrarModal = true;
  }
  fecharModal() {
    this.mostrarModal = false;
  }

  resumo = {
    totalReceitas: 0,
    totalDespesas: 0,
    saldoAtual: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarDadosdoBolso();
  }

  carregarDadosdoBolso() {
    const dadosSalvos = localStorage.getItem('usuarioLogado');

    if (dadosSalvos) {
      const usuario = JSON.parse(dadosSalvos);

      if (usuario.contaCasal && usuario.contaCasal.id) {
        this.contaCasalId = usuario.contaCasal.id;

        console.log('Ticket Vip: ', this.contaCasalId);

        this.buscarResumoNoBackend();
      } else {
        console.error('Nenhum usuário logado encontrado.');
      }
    }
  }

  buscarResumoNoBackend() {
    const url = `http://localhost:8080/api/transacoes/conta/${this.contaCasalId}/resumo`;

    this.http.get<any>(url).subscribe({
      next: (dadosDoJava) => {
        this.resumo = dadosDoJava;
        console.log('Resumo carregado:', this.resumo);
      },
      error: (erro) => {
        console.error('Erro ao carregar resumo.', erro);
      },
    });
  }
}
