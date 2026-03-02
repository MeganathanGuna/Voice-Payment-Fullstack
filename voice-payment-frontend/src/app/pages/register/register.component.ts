import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private speech: SpeechService,
    private auth: AuthService,
    private router: Router
  ) {}

  async register() {
    try {
      alert('Say your desired username clearly');
      const usernameText: string = (await this.speech.listen()).trim();

      alert('Say your desired password clearly');
      const passwordText: string = (await this.speech.listen()).trim();

      this.auth.register(usernameText, passwordText).subscribe({
        next: () => {
          alert('Registration successful! You can now login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed. Please try again.');
          console.error(err);
        }
      });
    } catch (err) {
      alert('Speech recognition failed. Please try again.');
      console.error(err);
    }
  }
}