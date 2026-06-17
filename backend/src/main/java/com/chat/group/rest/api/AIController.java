package com.chat.group.rest.api;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ai")
@CrossOrigin("*")
public class AIController {
	
	@Autowired
	public OpenAiChatModel chatModel;
	
	@GetMapping("chat")
	public String chat(@RequestParam String prompt) {
		return chatModel.call(prompt); 
	}
	
}
