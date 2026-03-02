package com.example.voice_payment_clg.dto;

public class VoiceAuthRequest {

    private String usernameVoice;
    private String passwordVoice;

    public String getUsernameVoice() {
        return usernameVoice;
    }

    public void setUsernameVoice(String usernameVoice) {
        this.usernameVoice = usernameVoice;
    }

    public String getPasswordVoice() {
        return passwordVoice;
    }

    public void setPasswordVoice(String passwordVoice) {
        this.passwordVoice = passwordVoice;
    }
}