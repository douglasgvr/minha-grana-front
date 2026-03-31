import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, CommonModule, FormsModule],
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

  novaTransacao = {
    tipo: 'RECEITA',
    valor: null,
    descricao: '',
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

  salvarTransacao() {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    let meuId = '';
    if (dadosSalvos) {
      const usuario = JSON.parse(dadosSalvos);
      meuId = usuario.id;
    }

    const pacoteParaOJava = {
      descricao: this.novaTransacao.descricao,
      valor: this.novaTransacao.valor,
      tipoTransacao: this.novaTransacao.tipo,
      dataPagamento: new Date().toISOString().split('T')[0], // Pega a data de hoje no formato YYYY-MM-DD
      despesaConjunta: true,
      usuarioId: meuId,
      contaCasalId: this.contaCasalId,
    };

    console.log('Enviando transação corrigida para a cozinha...', pacoteParaOJava);

    this.http.post('http://localhost:8080/api/transacoes', pacoteParaOJava).subscribe({
      next: (resposta) => {
        console.log('Sucesso! O Java salvou a transação:', resposta);
        this.fecharModal();
        this.novaTransacao = { descricao: '', valor: null, tipo: 'DESPESA' };

        this.buscarResumoNoBackend();
      },
      error: (erro) => {
        console.error('Erro ao salvar a transação:', erro);
        alert('Erro ao salvar. Olhe o console (F12) para ver o que o Java reclamou.');
      },
    });
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
