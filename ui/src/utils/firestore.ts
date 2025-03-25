import {app} from "../utils/firebase";
import {
    collection as fCollection,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    addDoc,
    deleteDoc,
    where,
    getDocs,
    WhereFilterOp,
} from "firebase/firestore";

const db = getFirestore(app);

export async function setOrUpdate(collection: string, id: string | undefined, data: any) {
    if (id) {
        const ref = doc(db, collection, id);
        const exists = (await getDoc(ref)).exists();
        if (exists) {
            await updateDoc(ref, data)
        } else {
            await setDoc(ref, data)
        }
        return data;
    } else {
        const ref = fCollection(db, collection);
        const d = await addDoc(ref, data)
        return {
            id: d.id,
            ...data
        };
    }
}

export async function del(collection: string) {
    const docRef = doc(db, collection);
    return await deleteDoc(docRef)
}

export async function delDoc(collection: string, id: string) {
    const docRef = doc(db, collection, id);
    return await deleteDoc(docRef)
}

export function subscribeTo(collection: string, onUpdate: (data: { string: any }) => void) {
    const q = query(fCollection(db, collection));
    return onSnapshot(q, (snapshot: any) => {
        const data: any = {}
        snapshot.forEach((doc: any) => {
            data[doc.id] = doc.data()
        });
        onUpdate(data)
    });
}

export async function getItems(
    collection: string,
    filters?: [string, WhereFilterOp, any][]
): Promise<any[]> {
    let q;
    if (filters) {
        const wheres = filters.map(([field, operator, value]) => {
            return where(field, operator, value);
        });
        q = query(fCollection(db, collection), ...wheres);
    } else {
        q = query(fCollection(db, collection));
    }

    console.log(q);
    
    // Get the documents from the query
    const querySnapshot = await getDocs(q);

    // Return the first matching document's data
    return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function getItem(
    collection: string,
    filters: [string, WhereFilterOp, any][]
): Promise<any> {
    const items = await getItems(collection, filters)

    if (!items || !items.length) {
        return null;
    }

    return items[0];
}

export async function getItemById(
    collection: string,
    id: string
): Promise<any> {
    const ref = doc(db, collection, id);
    const data = await getDoc(ref);

    if (!data.exists()) {
        return null
    }

    return {
        id: data.id,
        ...data.data()
    }
}