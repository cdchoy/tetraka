// server/User.ts

export class User {
	name : string = "Alexey Pajitnov";
 	username : string;
	usertag : string;

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

	public updateUsername(newUsername:string) : void {
		this.username = newUsername;
		this.usertag = this.generateUsertag();
	}

}
