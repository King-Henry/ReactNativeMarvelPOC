import { useRealm } from "@realm/react"
import Realm, { Results, UpdateMode } from "realm"

export const useLocalDataStore = () => {
    const realm = useRealm()

    const get = <T extends Realm.Object<T>>(type: string, id: string | number): T | null => {
        const found = realm.objectForPrimaryKey(type, id)
        if(!found) {
            return null 
        } else {
            return found as T
        }
    }

    const create = <T extends Realm.Object<T>>(type: string, model: T | Partial<T>): boolean => {
        try { 
            realm.write(() => {
                realm.create(type, model, UpdateMode.Never);
            });
            return true
        } catch(error) {
            console.log("Oh noooo we received an error: " + error)
            return false
        }
    }

    const deleteModel = (type: string, id: string | number): boolean => {
        try { 
            const modelToDelete = realm.objectForPrimaryKey(type, id)
            if(!modelToDelete) {
                console.log("Couldn't find model with id: " + id)
                return false
            }
            
            realm.write(() => {
                realm.delete(modelToDelete);
            });
            console.log(`Successfully deleted ${type} model of id ${id}`)
            return true
        } catch(error) {
            console.log("Oh noooo we received an error: " + error)
            return false
        }
    }

    const update = <T extends Realm.Object<T>>(type: string, props: T | Partial<T>): boolean => {
        try { 
            realm.write(() => {
                realm.create<T>(type, props, UpdateMode.Modified);
            });
            return true
        } catch(error) {
            console.log("Oh noooo we received an error: " + error)
            return false
        }
    }

    // Unfortunately returning 'Results' means we're exposing implementation details of Realm. Not sure how else we'd handle this though/if it'd worth trying to
    // abstract it away
    const queryForObjectOfType = <T extends Realm.Object<T>>(type: string): Results<T> => {
        return realm.objects<T>(type)
    }

    return { create, get, update, deleteModel, queryForObjectOfType }
}