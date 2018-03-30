
import "reflect-metadata";

import { Validator } from './validator';

export interface ValidationOptions {

    /**
     * 数组项
     */
    item?: { new(): any } | [{
        name: string,
        options?: any
    } | string]

}

export class ValidationValidator extends Validator<ValidationOptions>{

    readonly name = 'Validation';

    get decorator() {
        return (options?: ValidationOptions) => {
            return this.getDecorator(options);
        }
    }

    protected validateOptions(target: any, key: string, options: ValidationOptions) {
        let type = Reflect.getMetadata('design:type', target, key);
        if (type === Array && (!options || !options.item)) {
            throw new Error(`When the ${key} is Array, options.item must have value`);
        }
    }

    validateProperty(target: any, key: string | number, options?: ValidationOptions) {
        return true;
    }

}