
import 'mocha';
import assert = require('assert');

import { Validate, Required, Validation } from '../src';

class User {

    @Required()
    name: string[]

    @Validation()
    other: string | any

    show() {
        console.log('User show', this.name);
    }
}

class Ctrl {

    @Validate(User)
    func1(user: User) {
        //user.show();
        return user;
    }

    @Validate({
        id: ['Required']
    })
    func2(id: string) {
        return id;
    }

}


describe('Koa Validate', function () {

    let ctrl: any;

    before(() => {
        ctrl = new Ctrl();
    })

    describe('func1', function () {

        it('body.name is n', function (done) {

            ctrl.context = {
                state: {},
                request: {
                    body: {
                        name: 'n'
                    }
                }
            }
            let user = ctrl.func1();

            assert.equal(user.name, 'n');

            done();

        })

        it('body.name is null', function (done) {

            ctrl.context = {
                state: {},
                request: {
                    body: {
                        name: null
                    }
                }
            }

            let user = ctrl.func1();

            assert.equal(ctrl.context.status, 400);

            done();

        })

        it('other', function (done) {

            ctrl.context = {
                state: {},
                request: {
                    body: {
                        name: 'n',
                        other: {
                            name: 1
                        }
                    }
                }
            }

            let user = ctrl.func1();

            assert.equal(user.other.name, 1);

            done();

        })

    })

    describe('func2', function () {

        it('query.id is 1', function (done) {

            ctrl.context = {
                state: {},
                query: {
                    id: '1'
                },
                request: {}
            }

            let id = ctrl.func2();

            assert.equal(id, '1');

            done();

        })

        it('body.id is 1', function (done) {

            ctrl.context = {
                state: {},
                request: {
                    body: {
                        id: '1'
                    }
                }
            }

            let id = ctrl.func2();

            assert.equal(id, '1');

            done();

        })

        it('body.id is null', function (done) {

            ctrl.context = {
                state: {},
                request: {
                    body: {
                        id: null
                    }
                }
            }

            let id = ctrl.func2();

            assert.equal(ctrl.context.status, 400);

            done();

        })

    })

})