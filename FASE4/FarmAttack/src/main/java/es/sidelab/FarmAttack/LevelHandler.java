package es.sidelab.FarmAttack;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class LevelHandler extends TextWebSocketHandler{
	
	private Map<Integer, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private Map<Integer, String> namesPlayers = new ConcurrentHashMap<>();
	
	private WebSocketSession sessionOne;
	private WebSocketSession sessionTwo;
	private int idOne = 1;
	private int idTwo = 2;
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		ObjectNode newNode = mapper.createObjectNode();
		
		System.out.println("0: " + sessions.get(0) + " 1: " + sessions.get(1));
		
		if(sessions.get(1) == null) 
		{
			sessionOne = session;			
			newNode.put("playerID", idOne);
			namesPlayers.remove(1);
			//NameOne = null;
			sessions.put(idOne, session);
			session.sendMessage(new TextMessage(newNode.toString()));
		}
		else if(sessions.get(2) == null) 
		{
			sessionTwo = session;
			newNode.put("playerID", idTwo);
			namesPlayers.remove(2);
			//NameTwo = null;
			sessions.put(idTwo, session);
			session.sendMessage(new TextMessage(newNode.toString()));
		}
		else 
		{
			newNode.put("lobby", "full");
			session.sendMessage(new TextMessage(newNode.toString()));
			System.out.println("Impossible to establish connection. The lobby is full, so the session with id: " + session.getId() + " can't connect.");
		}	
		
		if((sessions.get(1) != null && sessions.get(2) != null)) {
 			
 			ObjectNode responseNodeRoom = mapper.createObjectNode();
 			responseNodeRoom.put("type", "fullroom");
 			
 			sessionTwo.sendMessage(new TextMessage(responseNodeRoom.toString()));
	 			sessionOne.sendMessage(new TextMessage(responseNodeRoom.toString()));
     		
 		}
		
	}
	
	//Método que se ejecuta tras cerrar la conexión
	//Si la sesión cerrada es igual a la sesión 1, esta se borra, sino se borra la 2.
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		System.out.println("Session closed: " + session.getId());
		
		ObjectNode responseNodeLeave = mapper.createObjectNode();
		responseNodeLeave.put("type", "leave");
		
		//sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
		//sessionOne.sendMessage(new TextMessage(responseNodeOne.toString()));
		for (WebSocketSession participant : sessions.values()) {
			try 
			{
				//System.out.println("Eliminado after" + session.getId());
				System.out.println("0: " + sessions.get(1) + " 1: " + sessions.get(2));
				sessions.remove(1);
				sessions.remove(2);
				namesPlayers.remove(1);
				namesPlayers.remove(2);
				//NameOne = null;
				//NameTwo = null;
				System.out.println("0: " + sessions.get(1) + " 1: " + sessions.get(2));
				
				synchronized(participant) {
					participant.sendMessage(new TextMessage(responseNodeLeave.toString()));
				}
			}
			catch(Exception e) 
			{
				System.out.println("Catched " + e);
			}
		}
		
	}

	
	 @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message)throws Exception {
	 
         String msg = message.getPayload();
         JsonNode node = mapper.readTree(msg);
         
         String typeMessage = node.get("type").asText();
         
         switch(typeMessage){
         
         
         case "handshake":
        	 
        	 if(session.getId() == sessionOne.getId()) 
        	 {
        		 //NameOne = node.get("nombre").asText();
        		 namesPlayers.put(1, node.get("nombre").asText());
        	 }
        	 else if(session.getId() == sessionTwo.getId()) 
        	 {
        		 //NameTwo = node.get("nombre").asText();
        		 namesPlayers.put(2, node.get("nombre").asText());
        	 }
        	 
        	 System.out.println("NAME RECEIBED");

        	 if(namesPlayers.get(1) != null && namesPlayers.get(2) != null) 
        	 {
        		 System.out.println("Nombres no nulos");
        		 
        		 ObjectNode responseNode = mapper.createObjectNode();
         		 responseNode.put("type", "names");
         		 responseNode.put("name1", namesPlayers.get(1));
         		 responseNode.put("name2", namesPlayers.get(2));

      			sessionOne.sendMessage(new TextMessage(responseNode.toString()));
      			sessionTwo.sendMessage(new TextMessage(responseNode.toString()));
        	 }
        	
     		 break;
     		 
         case "startGame":
        	 
        	 ObjectNode responseNode = mapper.createObjectNode();
     		 responseNode.put("type", "startGame");
     		 
     		try {
     			
     			if((sessions.get(1) != null && sessions.get(2) != null))
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
        	 
         	case "syncTimer":
        	 
         		ObjectNode responseNodeSync = mapper.createObjectNode();
         		String time = node.get("time").asText();
         		responseNodeSync.put("type", "syncTimer");
         		responseNodeSync.put("time", time);
         		try {
         			sessionTwo.sendMessage(new TextMessage(responseNodeSync.toString()));
         			sessionOne.sendMessage(new TextMessage(responseNodeSync.toString()));
         			
         		}catch(Exception e) {
    				System.out.println("Error de conexión - " + e);
    			}
         		
 	   		break;
	 			
         
         case "leave":
        	 
        	 /*System.out.println("K me voy loko");
        	 ObjectNode responseNodeOne = mapper.createObjectNode();
 			 responseNodeOne.put("type", "leave");
 			 sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
 			 sessionOne.sendMessage(new TextMessage(responseNodeOne.toString()));*/
        	 
        	 ObjectNode responseNodeLeave = mapper.createObjectNode();
        	 responseNodeLeave.put("type", "leave");
     		//sessionTwo.sendMessage(new TextMessage(responseNodeOne.toString()));
     		//sessionOne.sendMessage(new TextMessage(responseNodeOne.toString()));
     		 
        	 
        	 if (node.get("inGame").asText() == "yes") {
       		 
        		 System.out.println("ME VOY DEL JUEGO");
        		 
        		 sessions.remove(1);
        		 sessions.remove(2);
        		 sessionOne = null;
        		 sessionTwo = null;
        		 //NameOne = null;
 				 //NameTwo = null;
        		 namesPlayers.remove(1);
 				 namesPlayers.remove(2);
    	   		 sessionOne.sendMessage(new TextMessage(responseNodeLeave.toString()));
    	   		 sessionTwo.sendMessage(new TextMessage(responseNodeLeave.toString()));
        	   		
        			
        	 }
        	 else 
        	 {
        		 if (session.getId() == sessionOne.getId()) {
          			System.out.println("el uno se piro");
          			sessions.remove(1);
          			sessionOne = null;
          			//NameOne = null;
          			namesPlayers.remove(1);
    				sessionTwo.sendMessage(new TextMessage(responseNodeLeave.toString()));
          	 			
          	   	 }else if (session.getId() == sessionTwo.getId()) {
          	   		System.out.println("el dos se piro");
          	   		sessions.remove(2);
          	   		sessionTwo = null;
          	   	    namesPlayers.remove(2);
				    sessionOne.sendMessage(new TextMessage(responseNodeLeave.toString()));
          	   	 }
        	 }
     		
     		
     		//System.out.println("Eliminado leave" + session.getId());
     		//sessions.remove(session.getId());
     		
        	 
        	 break;
        	 
         	case "gameover":
         		
         		ObjectNode responseNodeOver = mapper.createObjectNode();
         		responseNodeOver.put("type", "gameover");
         		
         		if (session.getId() == sessionOne.getId()) {
          			sessionTwo.sendMessage(new TextMessage(responseNodeOver.toString()));
          	 			
          	   	 }else if (session.getId() == sessionTwo.getId()) {
          	   		sessionOne.sendMessage(new TextMessage(responseNodeOver.toString()));
          	   	 }
         		
        	 break;
        	 
         	/*case "joinroom":
         		
         		
         		
         		break;*/
        	 
         }    
	 
	 }
    
}