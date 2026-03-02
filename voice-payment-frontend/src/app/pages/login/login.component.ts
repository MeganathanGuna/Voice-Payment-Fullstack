import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private speech: SpeechService,
    private auth: AuthService,
    private router: Router
  ) {}

  async startLogin() {
    try {
      alert('Please say your username clearly');
      const usernameText: string = (await this.speech.listen()).trim();

      alert('Please say your password clearly');
      const passwordText: string = (await this.speech.listen()).trim();

      this.auth.login(usernameText, passwordText).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Invalid username or password. Please try again or register.');
        }
      });
    } catch (err) {
      alert('Speech recognition failed. Please try again.');
      console.error(err);
    }
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}