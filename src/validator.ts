
import "reflect-metadata";

import { ValidationResult } from './validation-result';

export abstract class Validator<T> {

    protected typeKeys: Map<Object, string[]>;

    readonly name: string;

    protected metadataKey: symbol;

    isNullOrUndefined = (x: any) => x === null || x === undefined;

    isNotNumber = (x: any) => !this.isNullOrUndefined(x) && typeof x !== 'number'

    constructor() {
        this.typeKeys = new Map();
        this.metadataKey = Symbol(this.name);
    }

    abstract get decorator(): Function;

    protected validateOptions?(target: Object, propertyKey: string, options?: T): void;

    protected getDecorator(options?: T) {
        return (target: Object, propertyKey: string) => {
            if (this.validateOptions) {
                this.validateOptions(target, propertyKey, options);
            }
            let keys = this.typeKeys.get(target) || [];
            keys.push(propertyKey);
            this.typeKeys.set(target, keys);
            //console.log('getDecorator',target,propertyKey,keys);
            if (!this.isNullOrUndefined(options)) {
                Reflect.defineMetadata(this.metadataKey, options, target, propertyKey);
            }
        }
    }

    keys(prototype: Object) {
        return this.typeKeys.get(prototype);
    }

    getOptions(target: any, key: string) {
        return Reflect.getMetadata(this.metadataKey, target, key);
    }

    validate(target: Object, prototype: Object) {

        let result = new ValidationResult(true);

        let keys = this.typeKeys.get(prototype);
        // console.log(this.name,'validate', target, prototype, keys);
        if (!keys) {
            return result;
        }

        let properties = new Array<string>();

        for (let key of keys) {

            let options = this.getOptions(target, key);

            if (!this.validateProperty(target, key, options)) {
                properties.push(key);
            }

        }

        if (properties.length > 0) {
            result.valid = false;
            result.data = properties;
        }

        return result;

    }

    abstract validateProperty(target: any, key: string | number, t?: T): boolean;

}