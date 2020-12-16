package es.sidelab.FarmAttack;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import com.google.gson.*;

@RestController
@RequestMapping("/users")
public class UsersController {
	
	//Constructor inicial (cojemos usuarios ya creados)
	private static Map<String,User> users  = new ConcurrentHashMap<String, User>();
	private List<String> userlist = new ArrayList<String>();
	private int usersconected;
	public UsersController(){
		TakeInfo();
	}
	
	public void TakeInfo(){
		try (FileReader file = new FileReader("data.json")){
			Gson gson = new Gson();
			User usuarios[] = gson.fromJson(file,User[].class);
			if(usuarios !=null ) {
				for (User user : usuarios) {
					System.out.println(user.toString());
					String name = user.getName();
					users.put(name, user);
					userlist.add(name);
				}
			}
        }catch(FileNotFoundException e) {
			File createfile = new File("data.json");
			FileWriter fw;
			try {
				fw = new FileWriter(createfile);
				BufferedWriter bw = new BufferedWriter(fw);
				bw.write("[{\"ip\":\"0:0:0:0:0:0:0:1\",\"name\":\"Prothoky\",\"score\":0,\"online\":false,\"lastconection\":\"Dec 11, 2019 11:25:54 PM\"}]");
				bw.close();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			System.out.println(createfile.exists());
        }catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	
	@GetMapping
	public Collection<User> Users() {
		return users.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> newUser(@RequestBody User usuario,HttpServletRequest request) {
		String ip = getIP(request);
		String name = usuario.getName();
		Date time = new Date();
		if(!users.containsKey(name)) {
			usuario.setIp(ip);
			usuario.setTime(time);
			users.put(name, usuario);
			userlist.add(name);
			SaveInfo();
			return ResponseEntity.status(HttpStatus.CREATED).body(usuario.toString());
		}
		else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("The user "+ usuario.getName() + " con ip " + ip + " has already been created");
		}

	}

	@PutMapping("/{name}")
	public ResponseEntity<User> UpdateUser(@PathVariable String name, @RequestBody User userUpdated) {

		User savedUser = users.get(name);
		if (savedUser != null) {
			if(!name.contentEquals(userUpdated.getName())) {
				if(!users.containsKey(userUpdated.getName())) {
					users.remove(name);
					users.put(userUpdated.getName(), userUpdated);
					userlist.remove(name);
					userlist.add(userUpdated.getName());
					System.out.println("Nuevo nombre de usuario");
					System.out.println("Usuario: " + name + " a partir de ahora sera: " + userUpdated.getName());
				}else {
					return new ResponseEntity<User>(HttpStatus.CONFLICT);
				}
			}
			else {
				System.out.println(userUpdated.getScore());
				users.put(name, userUpdated);		
				System.out.println("User " + name + "actualizado");
			}
			System.out.println("Usuario actualizado correctamente");
			SaveInfo();
			return new ResponseEntity<User>(userUpdated, HttpStatus.OK);
		}else {
			System.out.println("Usuario no encontrado");
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	//Petición de polling
	@GetMapping("/{name}")
	public ResponseEntity<User> getUser(@PathVariable String name) {
		Date time = new Date();
		User savedUser = users.get(name);
		if(savedUser!=null) {
			savedUser.SetOnline(true);
			savedUser.setTime(time);
			savedUser.setUsersOnline(usersconected);
			users.put(name, savedUser);
			return new ResponseEntity<User>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Petición de polling
	@GetMapping("/Users")
	public ResponseEntity<LinkedList<User>> getUsers() {
		LinkedList<User> lista = new LinkedList<User>();
		for (int i = 0; i < users.values().toArray().length; i++) {
			lista.add((User) users.values().toArray()[i]);
		}
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}

	@DeleteMapping("/{name}")
	public ResponseEntity<User> borraUser(@PathVariable String name) {

		User savedUser = users.get(name);
		if (savedUser != null) {
			users.remove(savedUser.getName());
			userlist.remove(savedUser.getName());
			SaveInfo();
			return new ResponseEntity<User>(savedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}

	public String getIP(HttpServletRequest request) {
		String remoteAddr=null;
		if (request != null) {
			remoteAddr = request.getHeader("X-FORWARDED-FOR");
			if (remoteAddr == null || "".equals(remoteAddr)) {
				remoteAddr = request.getRemoteAddr();
			}
		}
		return remoteAddr;				
	}

	public void SaveInfo() {
		try (FileWriter file = new FileWriter("data.json")) {
			Gson gson = new Gson();
			gson.toJson(users.values(), file);
			file.close();
			System.out.println("Saved");
		}catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	@Scheduled(fixedRate=2000)
    public void CheckUsersOnline() {
		int num=0;
		if(users!=null && userlist!=null) {
			for (String name : userlist) {
				User user = users.get(name);
				if(user.getOnline()) {
					System.out.println(user.toString());
					if(new Date().getTime() - user.getTime().getTime() >= 10000) {
						user.SetOnline(false);
						users.put(user.getName(), user);
					}
					else {
						System.out.println(user.getName() + " is Online");
						user.SetOnline(true);
						users.put(user.getName(), user);
						num++;
					}
				}
			}
		}
		System.out.println("Hay " + num + " usuarios conectados");
		usersconected = num;
	}
}
