import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { AuthService } from "../core/services/auth.service";
import { BasicCredential } from "../core/types/BasicCredential";
import { FacebookLogin } from "../core/types/FacebookLogin";
import { GoogleLogin } from "../core/types/GoogleLogin";

@Component({
	selector: "app-home",
	template: `<div class="h-screen w-screen flex items-center justify-center">
		<div
			*ngIf="!logged"
			class="flex flex-col gap-10"
		>
			<div class="text-coreblue text-3xl">Ingrese a su cuenta</div>
			<button
				class="border-2 rounded-xl px-4 py-2 border-red text-red hover:scale-110 transition-all duration-300"
				(click)="login('google')"
			>
				Google
			</button>
			<button
				class="border-2 rounded-xl px-4 py-2 border-skyblue text-skyblue hover:scale-110 transition-all duration-300"
				(click)="login('twitter')"
			>
				Twitter
			</button>
			<button
				class="border-2 rounded-xl px-4 py-2 border-aqua-dark text-aqua-dark hover:scale-110 transition-all duration-300"
				(click)="login('facebook')"
			>
				Facebook
			</button>
		</div>

		<app-chat
			*ngIf="logged"
			[name]="name"
		></app-chat>
	</div>`,
	styles: [],
})
export class ChatHomeComponent implements OnInit {
	public logged = false;
	public name = "";

	constructor(
		private fireAuth: AngularFireAuth,
		private authService: AuthService,
	) {}

	ngOnInit(): void {}

	public login(provider: string) {
		console.log(provider);

		switch (provider) {
			case "google":
				this.fireAuth
					.signInWithPopup(new firebase.auth.GoogleAuthProvider())
					.then((credential) => {
						const googleCred =
							credential.credential!.toJSON() as BasicCredential;
						const login: GoogleLogin = {
							accessToken: googleCred.accessToken,
						};

						this.authService.googleLogin(login).subscribe({
							next: (user) => {
								this.name = `${user.firstNames} ${user.lastNames}`;
								this.logged = true;
							},
							error: () => {
								alert("There has been an error!");
							},
						});
					});
				break;
			case "facebook":
				this.fireAuth
					.signInWithPopup(new firebase.auth.FacebookAuthProvider())
					.then((credential) => {
						const facebookCred =
							credential.credential!.toJSON() as BasicCredential;
						const login: FacebookLogin = {
							facebookToken: facebookCred.accessToken,
						};

						this.authService.facebookLogin(login).subscribe({
							next: (user) => {
								this.name = `${user.firstNames} ${user.lastNames}`;
								this.logged = true;
							},
							error: () => {
								alert("There has been an error!");
							},
						});
					});
				break;
			case "twitter":
				break;
			default:
				break;
		}
	}

	public logout() {
		this.fireAuth.signOut();
	}
}
