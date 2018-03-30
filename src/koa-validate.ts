
import { validate, getPropertyType, PropertyValidatorOptions } from './validate';

export function koaValidate(args: PropertyValidatorOptions | Function) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;
        descriptor.value = function () {

            //koa context
            let ctx = this.context;
            let params = getParams(ctx);

            let result;
            let isFunc = false;
            if (typeof args === 'function') {
                isFunc = true;

                try {
                    params = create(params, args as any);
                    result = validate(params);
                } catch (error) {
                    error.expose = true;
                    throw error;
                }
            } else {
                result = validate(params, args);
            }

            if (result.valid === false) {
                ctx.status = 400;
                ctx.body = result.data;
            } else {
                return method.apply(this, isFunc ? [params] : Object.keys(args).map(k => params[k]));
            }

        }
    }
}

function getParams(ctx: any) {

    let params = Object.assign({}, ctx.query);

    //koa-ts-route
    if (ctx.state.route && ctx.state.route.data) {
        params = Object.assign(params, ctx.state.route.data);
    }

    if (ctx.request.body) {
        params = Object.assign(params, ctx.request.body);
    }

    return params;
}

function convert(params: any, prototype: Object) {

    let propertyTypes = getPropertyType(prototype);

    if (propertyTypes) {
        for (let key in propertyTypes) {

            let value = params[key];
            if (value === null || value === undefined) {
                continue;
            }

            let type = propertyTypes[key];

            if (type === Object || type === String || type === Array
                || type === Symbol) {
                continue;
            }

            if (type === Number) {
                params[key] = Number(value);
            } else if (type === Date) {
                params[key] = new Date(value);
            } else if (type === Boolean) {
                params[key] = Boolean(value);
            } else {
                convert(value, type.prototype);
                params[key] = value;
            }

        }
    }

    Object.setPrototypeOf(params, prototype);

}

function create(params: any, c: { new(): any }) {

    let obj: any;

    // try {
    if ((<any>c).from && typeof (<any>c).from === 'function') {

        obj = (<any>c).from(params);

    } else {

        // try {
        obj = new c();

        let propertyTypes = getPropertyType(c.prototype);

        if (propertyTypes) {
            for (let key in propertyTypes) {

                let value = params[key];
                if (value === null || value === undefined) {
                    continue;
                }

                let type = propertyTypes[key];

                if (type === Object || type === String || type === Array
                    || type === Symbol) {
                    obj[key] = value;
                } else if (type === Number) {
                    obj[key] = Number(value);
                } else if (type === Date) {
                    obj[key] = new Date(value);
                } else if (type === Boolean) {
                    obj[key] = Boolean(value);
                } else {
                    obj[key] = create(value, type as any);
                }

            }
        }
        // } catch (e) {
        //     obj = params;
        //     Object.setPrototypeOf(obj, c.prototype);
        // }
    }
    // } catch (e) {
    //     obj = null;
    // }

    return obj;

}