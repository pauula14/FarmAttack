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
		ObjectNode newNode = mapper.createObjectNode();
		if(sessionOne == null) {
			sessionOne = session;
			
			newNode.put("playerID", idOne);
			session.sendMessage(new TextMessage(newNode.toString()));
		}else if(sessionTwo == null) {
			sessionTwo = session;
			newNode.put("playerID", idTwo);
			session.sendMessage(new TextMessage(newNode.toString()));
		}else {
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
		
		ObjectNode responseNodeOne = mapper.createObjectNode();
		responseNodeOne.put("type", "leave");
		sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
		sessionOne.sendMessage(new TextMessage(responseNodeOne.toString()));
		 
		if(session.equals(sessionOne)) {
			//System.out.println("1 cerrao ");
			sessionOne = null;
			//System.out.println("Se cerro el 1 ");
			//ObjectNode responseNodeOne = mapper.createObjectNode();
			//responseNodeOne.put("type", "leave");
			//sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
		}
		if(session.equals(sessionTwo)){
			//System.out.println("2 cerrao ");
			sessionTwo = null;
			//System.out.println("Se cerro el 2 ");
			//ObjectNode responseNodeTwo = mapper.createObjectNode();
			//responseNodeTwo.put("type", "leave");
			//sessionOne.sendMessage(new TextMessage(responseNodeTwo.toString()));
 			
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
	
	//HAY QUE PASAR ASI LOS MENSAJESSSSSSS
	//that.connection.send(JSON.stringify({ type: "event", id: that.myPlayer.id, key: event.key }));
	
	 @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
	 
         String msg = message.getPayload();
         JsonNode node = mapper.readTree(msg);
         
         String typeMessage = node.get("type").asText();
         
         switch(typeMessage){
         
       //DAR COMIENZO LOS DOS A LA PARTIDA
         case "startGame":
        	 
        	 ObjectNode responseNode = mapper.createObjectNode();
     		 responseNode.put("type", "startGame");
     		 
     		try {
     			sessionOne.sendMessage(new TextMessage(responseNode.toString()));
     			sessionTwo.sendMessage(new TextMessage(responseNode.toString()));
			}catch(Exception e) {
				System.out.println("Error de conexión - " + e);
			}
     		
        	 break;
        	 
         case "skipTutorial":
        	 ObjectNode responseNode2 = mapper.createObjectNode();
        	 responseNode2.put("type", "skipTutorial");
     		 
     		try {
     			sessionOne.sendMessage(new TextMessage(responseNode2.toString()));
     			sessionTwo.sendMessage(new TextMessage(responseNode2.toString()));
			}catch(Exception e) {
				System.out.println("Error de conexión - " + e);
			}
     		
        	break;
        	
         case "updatePosition":
        	 
        	 //METER EN UN MAPPER TODA LA INFO A ATUALIZAR
        	 float posX = Float.parseFloat(node.get("posX").asText());
        	 float posY = Float.parseFloat(node.get("posY").asText());
        	 float accX = Float.parseFloat(node.get("accX").asText());
        	 float accY = Float.parseFloat(node.get("accY").asText());
        	 
        	 ObjectNode responseNodePosition = mapper.createObjectNode();
        	 
             responseNodePosition.put("type", "updatePosition");
        	 responseNodePosition.put("posX", posX);
        	 responseNodePosition.put("posY", posY);
        	 responseNodePosition.put("accX", accX);
        	 responseNodePosition.put("accY", accY);
        	 if(node.get("event") != null) {
        		 responseNodePosition.put("event", node.get("event").asText());
        	 }
        	 
        	 if (session.getId() == sessionOne.getId()) {
        		 sessionTwo.sendMessage(new TextMessage(responseNodePosition.toString()));
      			
        	 }else if (session.getId() == sessionTwo.getId()) {
        		 sessionOne.sendMessage(new TextMessage(responseNodePosition.toString()));
        	 }
        	 else {
        		 System.out.println("SALE MAL");
        	 }
        	 break;
        	 
         case "leave":
        	 
        	 System.out.println("K me voy loko");
        	 ObjectNode responseNodeOne = mapper.createObjectNode();
 			 responseNodeOne.put("type", "leave");
 			 sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
 			 sessionOne.sendMessage(new TextMessage(responseNodeOne.toString()));
        	 
        	 break;

         }
	 
	 }
    
}