import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from '@angular/fire/storage';

import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  limit,
  FieldValue,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import * as firebase from 'firebase/app';
import { increment } from '@angular/fire/firestore';
const app = initializeApp(environment.firebaseConfig);
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: Firestore) {}
  postsCollection = collection(this.fireStore, 'posts');

  loadPost(): Observable<any> {
    return collectionData(this.postsCollection, { idField: 'id' });
  }

  async getSinglePost(id: string): Promise<any> {
    const postDocRef = doc(this.fireStore, 'posts', id);
    const postDocSnap = await getDoc(postDocRef);

    return postDocSnap.data();
  }
  countViews(postId: string, view: number) {
    const postDoc = doc(this.fireStore, 'posts', postId);

    updateDoc(postDoc, { views: view + 1 });
  }
}
