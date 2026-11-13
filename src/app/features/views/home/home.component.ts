import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SignInService } from "src/app/services/sign-in.service";
import { Loader } from "@googlemaps/js-api-loader";
import { makeBindingParser } from "@angular/compiler";
import oficinasBBVA from "src/assets/json/data-bbva.json";
@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	title = "DemoGoogleMaps";
	dniLocal = new FormControl();
	name: string = "";

	oficinasBBVA: any = oficinasBBVA;

	constructor(private signInvitadoService: SignInService) {}

	ngOnInit(): void {
		let loader = new Loader({
			apiKey: "AIzaSyC--DRYs-SMuF2gyUep-H5G-5eVvrYuek8",
		});

		loader.load().then(() => {
			var myLating = new google.maps.LatLng(-25.363882, 131.844922);

			var mapOptions = {
				zoom: 4,
				center: myLating,
			};

			var map = new google.maps.Map(
				document.getElementById("map")!,
				mapOptions,
			);
			oficinasBBVA.forEach((dataBBVA: any) => {
				var marker = new google.maps.Marker({
					position: myLating,
					title: "Hello World!",
				});
				marker.setMap(map);
			});
		});
	}

	dataDni(param: string) {
		this.signInvitadoService.getDataDni(param).subscribe({
			next: (data: any) => {
				console.log(data);
				this.name = data.nombre;
			},
		});
	}
}
