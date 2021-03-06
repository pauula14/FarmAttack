package es.sidelab.FarmAttack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.scheduling.annotation.EnableScheduling;


import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@SpringBootApplication
@EnableWebSocket

public class App implements WebSocketConfigurer
{

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        registry.addHandler(new LevelHandler(), "/ws-level");//.setAllowedOrigins("*");
    }
    
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
}
