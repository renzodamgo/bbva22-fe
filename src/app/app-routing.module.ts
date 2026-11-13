import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./features/views/home/home.component";
import { MapComponent } from "./features/views/map/map.component";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "map",
		component: MapComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
