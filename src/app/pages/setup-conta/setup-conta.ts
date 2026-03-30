import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-conta',
  imports: [],
  templateUrl: './setup-conta.html',
  styleUrl: './setup-conta.css',
})
export class SetupConta {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  criarCofre() {
    const dadosSalvos = localStorage.getItem('usuarioLogado');

    if (dadosSalvos) {
      const usuario = JSON.parse(dadosSalvos);
      const meuId = usuario.id;

      const pacoteParaOJava = {
        nome: 'Cofre da Família',
        usuarioId: meuId,
      };

      console.log('Pacote para o Java:', pacoteParaOJava);

      this.http.post('http://localhost:8080/api/contas', pacoteParaOJava).subscribe({
        next: (respostaNovaConta: any) => {
          console.log('Sucesso ao criar o cofre:', respostaNovaConta);
          usuario.contaCasal = respostaNovaConta;
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          console.error('Erro ao criar o cofre:', erro);
        },
      });
    } else {
      console.log('Nenhum usuário logado encontrado.');
    }
  }
}
