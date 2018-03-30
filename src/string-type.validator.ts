
import "reflect-metadata";

import { Validator } from './validator';

const reg_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const reg_url = /^(((https?:\/\/)|(ftp:\/\/)|(\/\/)))?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\??([\w-]+=[\w-\{\}\[\]]*&?)*$/;

const reg_ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const reg_ipv6 = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/

export interface StringTypeOptions {

    /**
     * 字符串类型
     */
    type?: 'email' | 'url' | 'ip'

    /**
     * 正则表达式
     */
    regExp?: RegExp

}

export class StringTypeValidator extends Validator<StringTypeOptions>{

    readonly name = 'StringType';

    get decorator() {
        return (options?: StringTypeOptions) => {
            if (!options.type && !options.regExp) {
                throw new Error("options properties must at least one has value");
            }
            return this.getDecorator(options);
        }
    }

    validateProperty(target: any, key: string, options?: StringTypeOptions) {

        let value = target[key];

        if (this.isNullOrUndefined(value)) {
            return true;
        }

        if (typeof value !== 'string') {
            //throw new Error(' `${this.name}: the type of '${(target as Object).constructor.name}.${key}' is not supported`
            return false;
        }

        if (options.type) {

            if (options.type === 'email') {
                return reg_email.test(value);
            }

            if (options.type === 'url') {
                return reg_url.test(value);
            }

            if (options.type === 'ip') {
                return reg_ipv4.test(value) || reg_ipv6.test(value);
            }

        } else {
            return options.regExp.test(value);
        }

    }

}