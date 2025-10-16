package com.mindcare.chat;

import java.time.Instant;

public class ChatMessage {
    private String sender; // email or role label
    private String text;
    private Instant timestamp;

    public ChatMessage() {}

    public ChatMessage(String sender, String text, Instant timestamp) {
        this.sender = sender;
        this.text = text;
        this.timestamp = timestamp;
    }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}



