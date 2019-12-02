package com.dev.chatApp;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

	@MessageMapping("/chat")
	@SendTo("/chat/global")

	public MessageWrapper chat(Message message) throws Exception {
		return new MessageWrapper(message.getName() + ": " + message.getMessage());
	}

}