
import "reflect-metadata";

import { Validator } from './validator';

const required_metadata_key = Symbol('required');

export interface RequiredOptions {

    /**
     * 依赖属性
     */
    depends: string | string[] | { [k: string]: any }

}


export class RequiredValidator extends Validator<RequiredOptions> {

    readonly name = 'Required';

    get decorator() {
        return (options?: RequiredOptions) => {
            return this.getDecorator(options);
        }
    }

    validateProperty(target: any, key: string, options?: RequiredOptions) {

        let hasValue = !this.isNullOrUndefined(target[key]);

        if (!options) {
            return hasValue;
        }

        let dependsHasValue: boolean;

        if (Array.isArray(options.depends)) {
            dependsHasValue = (options.depends as Array<string>).map(d => !this.isNullOrUndefined(target[d])).every(b => b);
        } else {
            if (typeof options.depends === 'string') {
                dependsHasValue = !this.isNullOrUndefined(target[options.depends]);
            } else {
                dependsHasValue = Object.keys(options.depends)
                    .map(k => {
                        let v = (options.depends as { [k: string]: any })[k];
                        if (Array.isArray(v)) {
                            return v.indexOf(target[k]) > -1;
                        } else {
                            return target[k] === v;
                        }
                    })
                    .every(b => b);
            }
        }

        return dependsHasValue ? hasValue : true;
    }

}