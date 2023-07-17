import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private fireStore: Firestore) {}

  loadCategory(): Observable<any> {
    const categoriesCollection = collection(this.fireStore, 'categories');
    collectionData(categoriesCollection, { idField: 'id' }).subscribe(
      (data) => {
        //console.log(data);
      }
    );
    return collectionData(categoriesCollection, { idField: 'id' });
  }

  async getSinglePost(id: string): Promise<any> {
    const postDocRef = doc(this.fireStore, 'categories', id);
    const postDocSnap = await getDoc(postDocRef);

    return postDocSnap.data();
  }
}
