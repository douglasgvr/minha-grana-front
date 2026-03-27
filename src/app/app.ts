import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  emailDigitado = "";
  senhaDigitada = "";

  fazerLogin() {
    console.log("Email: " + this.emailDigitado);
    console.log("Senha: " + this.senhaDigitada);
    alert("Tentando fazer login com email: " + this.emailDigitado + " e senha: " + this.senhaDigitada);
  }
}
