
import "reflect-metadata";

import { Validator } from './validator';

export interface ValueOptions {

    min?: number | Date

    max?: number | Date

    [k: string]: number | Date | Array<number | Date>

}

export class ValueValidator extends Validator<ValueOptions> {

    readonly name = 'Value';

    get decorator() {
        return (options: ValueOptions) => {
            if (this.isNullOrUndefined(options.min) && this.isNullOrUndefined(options.max)) {
                throw new Error('options properties must at least one have value');
            }
            return this.getDecorator(options);
        }
    }

    protected validateOptions(target: any, key: string, options: ValueOptions) {
        let type = Reflect.getMetadata('design:type', target, key);
        let keys = Object.keys(options);
        for (let k of keys) {
            if (this.isNullOrUndefined(options[k]) && Object.getPrototypeOf(options[k]).constructor !== type) {
                throw new Error(`options.${k} is not the ${type.name}`);
            }
        }
    }

    validateProperty(target: any, key: string, options: ValueOptions) {

        let value = target[key];

        if (this.isNullOrUndefined(value)) {
            return true;
        }

        if (typeof value === 'number') {
            if (!this.isNullOrUndefined(options.min) && value < options.min) {
                return false;
            }
            if (!this.isNullOrUndefined(options.max) && value > options.max) {
                return false;
            }
            return true;
        }

        if (value instanceof Date) {

            let time = value.getTime();

            if (!this.isNullOrUndefined(options.min) && time < (options.min as Date).getTime()) {
                return false;
            }
            if (!this.isNullOrUndefined(options.max) && time > (options.max as Date).getTime()) {
                return false;
            }
            return true;
        }

        throw new Error(`${this.name}: the type of '${(target as Object).constructor.name}.${key}' is not supported`);

    }

}


