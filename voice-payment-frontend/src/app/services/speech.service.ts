import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private recognition: any;
  private isListening = false;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-IN';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;
  }

  listen(): Promise<string> {
    return new Promise((resolve, reject) => {

      // 🛑 HARD STOP if already running
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }

      let transcript = '';

      this.recognition.onstart = () => {
        this.isListening = true;
        console.log('🎤 Speech recognition started');
      };

      this.recognition.onresult = (event: any) => {
        transcript = event.results[0][0].transcript.trim();
        console.log('🗣 Heard:', transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        console.log('🛑 Speech recognition ended');
        resolve(transcript);
      };

      // ✅ SAFE START
      this.recognition.start();
    });
  }
}
