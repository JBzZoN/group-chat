package com.chat.group.WebSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

	@SendTo("/topic/chat")
	@MessageMapping("/to-all")
	public String sendMessageOneToAll(String message) {
		return message;
	}
	
}