import { Component } from '@angular/core';

@Component({
  selector: 'app-setup-conta',
  imports: [],
  templateUrl: './setup-conta.html',
  styleUrl: './setup-conta.css',
})
export class SetupConta {
  criarCofre() {
    const dadosSalvos = localStorage.getItem('usuarioLogado');

    if (dadosSalvos) {
      const usuario = JSON.parse(dadosSalvos);
      const meuId = usuario.id;
      console.log('Botao clicado, ID do usuário:', meuId);
    } else {
      console.log('Nenhum usuário logado encontrado.');
    }
  }
}
