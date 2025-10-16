package com.mindcare.chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.time.Instant;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatSessionRepository repository;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatSessionRepository repository) {
        this.messagingTemplate = messagingTemplate;
        this.repository = repository;
    }

    @MessageMapping("/chat/{sessionId}")
    public void send(@DestinationVariable String sessionId, @Payload String text, Authentication authentication) {
        ChatSession session = repository.findById(sessionId).orElseGet(() -> {
            ChatSession s = new ChatSession();
            s.setId(sessionId);
            s.setUserId(authentication.getName());
            return s;
        });
        ChatMessage message = new ChatMessage(authentication.getName(), text, Instant.now());
        session.getMessages().add(message);
        repository.save(session);
        messagingTemplate.convertAndSend("/topic/chat/" + sessionId, message);
    }
}



