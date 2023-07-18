import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentsCollection = collection(this.fireStore, 'comments');

  constructor(private fireStore: Firestore) {}

  addComment(comment: Comment): void {
    addDoc(this.commentsCollection, comment).then((val) => {});
  }

  loadComment(): any {
    return collectionData(this.commentsCollection, { idField: 'id' });
  }
}
