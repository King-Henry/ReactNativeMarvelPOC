import Realm from "realm";

// In case we need some common interface methods across different models
export abstract class LocalModel<T> extends Realm.Object<T> {
    abstract getType(): string;
}