
import "reflect-metadata";

import { Validator } from './validator';

export interface MatchOptions {

    value?: boolean | string | number | Date | Array<boolean | string | number | Date>

    /** 属性值相等 */
    property?: string

    /** 不等于以上 */
    inverse?: boolean

}

export class MatchValidator extends Validator<MatchOptions> {

    readonly name = 'Match';

    get decorator() {
        return (options: MatchOptions) => {
            if (this.isNullOrUndefined(options.value) && this.isNullOrUndefined(options.property)) {
                throw new Error('value either property must have value');
            } else if (!this.isNullOrUndefined(options.value) && !this.isNullOrUndefined(options.property)) {
                throw new Error('value and property can not have value at the same time');
            }
            return this.getDecorator(options);
        }
    }

    protected validateOptions(target: any, key: string, options: MatchOptions) {
        let type = Reflect.getMetadata('design:type', target, key);
        let keys = Object.keys(options);
        if (!this.isNullOrUndefined(options.value)) {
            if (Array.isArray(options.value)) {
                options.value.forEach((value, i) => {
                    if (Object.getPrototypeOf(value).constructor !== type) {
                        throw new Error(`list[${i}] is not a ${type.name}`);
                    }
                });
            } else {
                if (Object.getPrototypeOf(options.value).constructor !== type) {
                    throw new Error(`value is not a ${type.name}`);
                }
            }
        }
    }

    validateProperty(target: any, key: string, options: MatchOptions) {

        let value = target[key];

        // if(this.isNullOrUndefined(value)){
        //     return true;
        // }

        if (!this.isNullOrUndefined(options.property)) {
            let equalValue = target[options.property];
            return options.inverse ? value !== equalValue : value === equalValue;
        }

        if (!this.isNullOrUndefined(options.value)) {
            if (this.isNullOrUndefined(value)) {
                return true;
            }
            if (Array.isArray(options.value)) {
                let result = options.value.some(x => x === value);
                return options.inverse ? !result : result;
            } else {
                if (value instanceof Date) {
                    let match = value.getTime() === (options.value as Date).getTime();
                    return options.inverse ? !match : match;
                } else {
                    return options.inverse ? value !== options.value : value === options.value;
                }
            }
        }

        throw new Error(`${this.name}: the type of '${(target as Object).constructor.name}.${key}' is not supported`);

    }

}


