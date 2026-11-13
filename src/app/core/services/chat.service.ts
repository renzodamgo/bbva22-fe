import { Injectable } from "@angular/core";
import { Chat } from "src/app/core/types/Chat";
import {
	AngularFireDatabase,
	AngularFireList,
	SnapshotAction,
} from "@angular/fire/compat/database";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ChatService {
	public chats!: AngularFireList<Chat>;

	constructor(private database: AngularFireDatabase) {
		this.chats = this.database.list<Chat>("chats");
	}
	public sendChat(chat: Chat) {
		this.chats.push(chat);
	}

	public getChats(): Observable<Chat[]> {
		return this.chats.valueChanges();
	}

	public getFullChats(): Observable<Chat[]> {
		return this.chats.snapshotChanges().pipe(
			map((chats: SnapshotAction<Chat>[]) =>
				chats.map((chat) => ({
					...chat.payload.val()!,
					id: chat.key!,
				})),
			),
		);
	}

	public deleteChatById(messageId: string) {
		const itemDoc = this.database.object(`chats/${messageId}`);
		itemDoc.remove();
	}
}
