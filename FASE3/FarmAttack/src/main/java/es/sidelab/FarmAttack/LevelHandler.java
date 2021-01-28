package es.sidelab.FarmAttack;

import java.io.IOException;
import java.util.Calendar;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.concurrent.Semaphore;

public class LevelHandler extends TextWebSocketHandler{
	
	private WebSocketSession sessionOne;
	private WebSocketSession sessionTwo;
	private int idOne = 1;
	private int idTwo = 2;
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		
		if(sessionOne == null) {
			sessionOne = session;
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("playerID", idOne);
			session.sendMessage(new TextMessage(newNode.toString()));
			System.out.println("Session one");
		}else if(sessionTwo == null) {
			sessionTwo = session;
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("playerID", idTwo);
			session.sendMessage(new TextMessage(newNode.toString()));
			System.out.println("Session two");
		}else {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("lobby", "full");
			session.sendMessage(new TextMessage(newNode.toString()));
			System.out.println("Impossible to establish connection. The lobby is full, so the session with id: " + session.getId() + " can't connect.");
		}		
	}
	
	//Método que se ejecuta tras cerrar la conexión
	//Si la sesión cerrada es igual a la sesión 1, esta se borra, sino se borra la 2.
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		if(session.equals(sessionOne)) {
			sessionOne = null;
		}
		if(session.equals(sessionTwo)){
			sessionTwo = null;
		}
	}
	
    /*@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //System.out.println("New session in level 1: " + session.getId());
		//sessions.put(session.getId(), session);
	}
    
    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//System.out.println("Session closed in level 1: " + session.getId());
		//sessions.remove(session.getId());
	}*/
    
}