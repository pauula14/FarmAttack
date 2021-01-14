package es.sidelab.FarmAttack;

import java.util.Date;

public class User {

	private String ip;
	private String name;
	private long score;
	private boolean online;
	private Date lastconection;
	private int usersonline;

	public User() {
	}

	public String getIp() {
		return ip;
	}
	
	public void setIp(String id) {
		this.ip = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String id) {
		this.name = id;
	}

	public long getScore() {
		return score;
	}

	public void setScore(long puntuacion) {
		this.score = puntuacion;
	}

	public boolean getOnline() {
		return online;
	}

	public void SetOnline(boolean status) {
		this.online = status;
	}

	public Date getTime() {
		return lastconection;
	}
	
	public void setTime(Date time) {
		this.lastconection = time;
	}

	public String toString() {
		return "User [ip: " + ip + ", name: " + name + ", score: " + score + ", date: " + lastconection + ", online: "+ online+" ]";
	}
	public void setUsersOnline(int i) {
		this.usersonline =i;
	}
	public int getUsersOnline() {
		return this.usersonline;
	}
}
