// server/User.ts

export class User {
	private name : string = "Alexey Pajitnov";
 	private username : string;
	private usertag : string;

	constructor(name:string, username:string) {
		this.name = name;
		this.username = username;
		this.usertag = this.generateUsertag();
	}

	private generateUsertag() : string {
		let tag : string = "#";

		// todo generate random 4 digit number
		// confirm no one else has the full string of username#usertag

		return tag;
	}

	public getUsername() : string { return this.username; }


	public updateUsername(newUsername:string) : void {
		this.username = newUsername;
		this.usertag = this.generateUsertag();
	}

}
