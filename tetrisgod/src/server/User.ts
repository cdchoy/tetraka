// server/User.ts

const usertagLength = 4;

export class User {
	private name 	 : string = "Alexey Pajitnov";
	private email	 : string;  // unique identifier
	private username : string = "TetrisGod";
	private usertag  : string = "#0123";
	private userid 	 : string = "TetrisGod#0123";
	private socketid : string;

	constructor(name:string, username:string, email:string, socket:any) {
		this.name 	  = name;
		this.username = username;
		this.email    = email;
		this.usertag  = this.generateUsertag();
		this.userid   = this.username + this.usertag;
		this.socketid = socket.id;
	}

	// Getters
	public getName() : string { return this.name; }
	public getUsername() : string { return this.username; }
	public getUsertag() : string { return this.usertag; }
	public getUserid() : string { return this.userid; }

	// Setters
	public setUsername(newUsername:string) : void {
		this.username = newUsername;
		this.usertag = this.generateUsertag();
		this.userid = this.username + this.usertag;
	}

	// Class Methods
	private generateUsertag() : string {
		const max : number = 10 ** usertagLength;
		const min : number = 0;

		// generate random num in range [min,max) and pad it
		let s : string = Math.floor(min + (max-min) * Math.random()).toString();
		while (s.length < usertagLength) s = "0" + s;
		let tag : string = "#" + s;

		//TODO: confirm no other user with this username has this tag

		return tag;
	}

}
