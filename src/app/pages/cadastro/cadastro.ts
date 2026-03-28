import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  nomeDigitado = "";
  emailDigitado = "";
  senhaDigitada = "";

  constructor(private http: HttpClient) { }

  criarConta() {
    const novoUsuario = {
      nome: this.nomeDigitado,
      email: this.emailDigitado,
      senha: this.senhaDigitada
    };

    this.http.post('http://localhost:8080/api/usuarios', novoUsuario)
      .subscribe({
        next: (resposta) => {
          console.log('Usuário criado com sucesso:', resposta);
          alert('Usuário criado com sucesso!');
        }
        ,
        error: (erro) => {
          console.error('Erro ao criar usuário:', erro);
          alert('Erro ao criar usuário. Por favor, tente novamente.');
        }
      });
  }
}
