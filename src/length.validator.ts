
import "reflect-metadata";

import { Validator } from './validator';

export interface LengthOptions {

    /**
     * 最小
     */
    min?: number

    /**
     * 最大
     */
    max?: number

    /**
     * 准确
     */
    exact?: number

}

export class LengthValidator extends Validator<LengthOptions> {

    readonly name = 'Length';

    get decorator() {
        return (options: LengthOptions) => {
            if (this.isNullOrUndefined(options.min) && this.isNullOrUndefined(options.max) && this.isNullOrUndefined(options.exact)) {
                throw new Error('options properties must at least one have value');
            } else if ((!this.isNullOrUndefined(options.min) || !this.isNullOrUndefined(options.max)) && !this.isNullOrUndefined(options.exact)) {
                throw new Error('exact and min or max can not have value at the same time');
            }
            if (this.isNotNumber(options.min)) {
                throw new Error('min is not a number');
            }
            if (this.isNotNumber(options.max)) {
                throw new Error('max is not a number');
            }
            if (this.isNotNumber(options.exact)) {
                throw new Error('exact is not a number');
            }
            return this.getDecorator(options);
        }
    }

    validateProperty(target: any, key: string, options: LengthOptions) {

        let value = target[key];

        if (this.isNullOrUndefined(value)) {
            return true;
        }

        if (typeof value === 'string' || Array.isArray(value)) {
            if (!this.isNullOrUndefined(options.exact)) {
                return value.length === options.exact;
            } else {
                if (!this.isNullOrUndefined(options.min) && value.length < options.min) {
                    return false;
                }
                if (!this.isNullOrUndefined(options.max) && value.length > options.max) {
                    return false;
                }
                return true;
            }
        }

        throw `${this.name}: the type of '${(target as Object).constructor.name}.${key}' is not supported`

    }

}


