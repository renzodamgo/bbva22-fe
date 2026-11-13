import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../types/User";
import { GoogleLogin } from "../types/GoogleLogin";
import { FacebookLogin } from "../types/FacebookLogin";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	public host: string = `${environment.apiUrl}/auth`;

	constructor(private http: HttpClient) {}

	public googleLogin(login: GoogleLogin): Observable<User> {
		return this.http.post<User>(`${this.host}/login/google`, login);
	}

	public facebookLogin(login: FacebookLogin): Observable<User> {
		return this.http.post<User>(`${this.host}/login/facebook`, login);
	}
}
