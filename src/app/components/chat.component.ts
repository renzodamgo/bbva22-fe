import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../core/services/chat.service";
import { Chat } from "../core/types/Chat";

@Component({
	selector: "app-chat",
	template: `
		<div
			class="h-screen w-screen flex flex-col justify-center gap-10 p-4 md:p-10"
		>
			<p class="text-3xl font-bold text-coreblue">BBVA 22 chat</p>
			<ul>
				<li
					class="text-aqua-dark font-semibold flex gap-10"
					*ngFor="let chat of chats"
				>
					<div
						class="cursor-pointer"
						(click)="deleteChat(chat.id!)"
					>
						{{ chat.name }}: {{ chat.message }}
					</div>
				</li>
			</ul>

			<div class="flex gap-4 md:gap-10 mt-auto">
				<input
					type="text"
					class="w-20 md:w-full grow border-2 rounded-xl px-4 py-2 focus:outline-none text-aqua-dark font-bold text-xl"
					[(ngModel)]="message"
					(keyup.enter)="sendChat()"
				/>
				<button
					class="border-2 rounded-xl px-4 py-2 bg-aqua-light text-aqua-dark font-bold text-xl"
					(click)="sendChat()"
				>
					Send
				</button>
			</div>
		</div>
	`,
	styles: [],
})
export class ChatComponent implements OnInit {
	@Input() public name = "";
	public chats!: Chat[];
	public message: string = "";

	constructor(private chatService: ChatService) {}

	ngOnInit(): void {
		this.chatService.getFullChats().subscribe({
			next: (chats) => {
				this.chats = chats;
			},
			error: () => {
				alert("There has been an error!");
			},
		});
	}

	public sendChat() {
		const chat: Chat = {
			name: this.name,
			message: this.message,
		};

		this.chatService.sendChat(chat);
		this.message = "";
	}

	public deleteChat(id: string) {
		if (confirm("Delete chat message?")) {
			this.chatService.deleteChatById(id);
		}
	}
}
