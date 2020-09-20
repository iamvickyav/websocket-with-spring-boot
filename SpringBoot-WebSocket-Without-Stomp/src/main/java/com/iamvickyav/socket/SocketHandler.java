package com.iamvickyav.socket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class SocketHandler extends TextWebSocketHandler {

	Map<String, WebSocketSession> sessionMap = new HashMap<>();

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message){

		String value = message.getPayload();

		sessionMap.values().parallelStream().forEach( webSocketSession -> {
			try {
				webSocketSession.sendMessage(new TextMessage(value));
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessionMap.put(session.getId(), session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessionMap.remove(session.getId());
	}
}