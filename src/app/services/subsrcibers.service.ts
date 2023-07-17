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
import { Sub } from '../models/sub';
@Injectable({
  providedIn: 'root',
})
export class SubsrcibersService {
  constructor(private fireStore: Firestore) {}

  isDuplicateEmail: boolean = false;

  addSubs(subData: Sub): boolean {
    const subscribersCollection = collection(this.fireStore, 'subscribers');

    collectionData(subscribersCollection).subscribe((subs) => {
      const subFilter = subs.find((sub: any) => sub.email === subData.email);
      if (subFilter) {
        this.isDuplicateEmail = true;
      } else {
        addDoc(subscribersCollection, subData);
        this.isDuplicateEmail = false;
      }
    });

    return this.isDuplicateEmail;
  }
}
