
import { Validator } from './validator';

import { ValidationResult } from './validation-result';

import { RequiredOptions, RequiredValidator } from './required.validator';

import { LengthOptions, LengthValidator } from './length.validator';

import { MatchOptions, MatchValidator } from './match.validator';

import { ValueOptions, ValueValidator } from './value.validator';

import { StringTypeOptions, StringTypeValidator } from './string-type.validator';

import { ValidationValidator, ValidationOptions } from './validation.validator';


const requiredValidator = new RequiredValidator();
export const Required = requiredValidator.decorator;

const lengthValidator = new LengthValidator();
export const Length = lengthValidator.decorator;

const matchValidator = new MatchValidator();
export const Match = matchValidator.decorator;

const valueValdator = new ValueValidator();
export const Value = valueValdator.decorator;

const stringTypeValdator = new StringTypeValidator();
export const StringType = stringTypeValdator.decorator;

const validationValidator = new ValidationValidator();
export const Validation = validationValidator.decorator;

const validators: Validator<any>[] = [
    requiredValidator,
    lengthValidator,
    matchValidator,
    valueValdator,
    stringTypeValdator
];

export interface PropertyValidatorOptions {

    [k: string]: [{
        name: string,
        options?: any
    } | string]

}

export function validate(target: any, options?: PropertyValidatorOptions) {

    if (!target) {
        throw new Error('target is Null or Undefined');
    }

    let data: {
        [k: string]: any[]
    } = {};

    let valid = true;

    if (options) {

        validateByOptions(target, options, data);

    } else {

        let prototype = Object.getPrototypeOf(target);

        validateCore(target, prototype, data);
    }
    //console.log('keys', data);
    if (Object.keys(data).length > 0) {
        valid = false;
    }


    return new ValidationResult(valid, data);
}

function validateByOptions(target: any, options: PropertyValidatorOptions, data: any) {
    for (let key in options) {
        let list = options[key];
        findValidatorAndValidate(list, target, key, data);
    }
}

function findValidatorAndValidate(optionsList: any[], target: any, key: string, data: any) {
    if (!optionsList) {
        return;
    }
    for (let item of optionsList) {
        let name = typeof item === 'string' ? item : item.name;
        let validator = validators.find(v => v.name === name);
        if (!validator) {
            throw new Error(`${name} unknown`);
        }
        if (Array.isArray(target)) {
            target.forEach((v, i) => {
                if (validator.validateProperty(target, i, (item as any).options) === false) {
                    let arr = data[name] || [];
                    arr.push(`${key}[${i}]`);
                    data[name] = arr;
                }
            })
        } else {
            if (validator.validateProperty(target, key, (item as any).options) === false) {
                let arr = data[name] || [];
                arr.push(key);
                data[name] = arr;
            }
        }
    }
}

function validateCore(target: any, prototype: Object, data: any) {

    //console.log('a', data);

    for (let validator of validators) {
        let result = validator.validate(target, prototype);
        if (!result.valid) {
            data[validator.name] = result.data;
        }
    }

    var func = (key: string, value: any) => {
        let prot = Object.getPrototypeOf(value);
        if (prot === Object.prototype) {
            // console.log('', key, value, prot);
            return;
        }
        var temp = {};
        validateCore(value, prot, temp);
        if (Object.keys(temp).length > 0) {
            data[key] = temp;
        }
    }

    let keys = validationValidator.keys(prototype);
    if (keys) {
        for (let key of keys) {
            let value = target[key];
            if (!value) {
                continue;
            }
            let type = Reflect.getMetadata('design:type', target, key);
            if (type === Array) {
                let options = validationValidator.getOptions(target, key);
                let isFunc = typeof options.item === 'function';
                if (isFunc) {
                    (value as Array<any>).forEach((item, i) => {
                        func(key + `[${i}]`, item);
                    });
                } else {
                    findValidatorAndValidate(options.item, value, key, data);
                }
            } else if (type !== String && type !== Number
                && type !== Symbol && type !== Boolean) {
                func(key, value);
            }
        }
    }

    //console.log('b', data);

    //console.log('validateCore','a', prototype);

    prototype = Object.getPrototypeOf(prototype);

    //console.log('validateCore','b', prototype);

    if (prototype !== Object.prototype) {
        validateCore(target, prototype, data);
    }

}

export function getPropertyType(prototype: Object) {

    if (!prototype) {
        throw new Error('prototype is Null or Undefined');
    }

    //console.log('getPropertyType', prototype);

    if (prototype === Object.prototype) {
        return null;
    }

    let keys = new Array<string>();
    getPrototypeKeys(prototype, keys);

    let keys2 = validationValidator.keys(prototype);
    if (keys2) {
        keys = keys2.concat(keys);
    }

    if (keys.length === 0) {
        return null;
    }

    let map: { [k: string]: Function } = {};

    keys.forEach(k => {
        map[k] = Reflect.getMetadata('design:type', prototype, k)
    });

    return map;
}

function getPrototypeKeys(prototype: Object, keys: string[]) {

    for (let validator of validators) {
        let arr = validator.keys(prototype);
        if (arr) {
            arr.forEach(k => {
                if (keys.indexOf(k) === -1) {
                    keys.push(k);
                }
            })
        }
    }

    prototype = Object.getPrototypeOf(prototype);

    if (prototype !== Object.prototype) {
        getPrototypeKeys(prototype, keys);
    }
}