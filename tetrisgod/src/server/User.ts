// server/User.ts

export class User {
	private name 	 : string = "Alexey Pajitnov";
 	private username : string = "TetrisGod";
	private usertag  : string = "#0123";
	private userid 	 : string = "TetrisGod#0123";
	private socketid : string;

	constructor(name:string, username:string) {
		this.name 	  = name;
		this.username = username;
		this.usertag  = this.generateUsertag();
		this.userid   = this.username + this.usertag;
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
		let tag : string = "#";

		// todo generate random 4 digit number
		// confirm no one else has the full string of username#usertag

		return tag;
	}

}
