import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChatHomeComponent } from "./pages/chathome.component";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { FormsModule } from "@angular/forms";
import { ChatComponent } from "./components/chat.component";
import { HttpClientModule } from "@angular/common/http";

import { HomeComponent } from "./features/views/home/home.component";
import { MapComponent } from "./features/views/map/map.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { HeaderComponent } from "./features/views/header/header.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		MapComponent,
		ChatComponent,
		ChatHomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		GoogleMapsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
