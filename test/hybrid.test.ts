
import 'mocha';
import assert = require('assert');

import { Match, Required, Length, Value, StringType, validate } from '../src';

describe('Hybrid', function () {

    class Test {

        @Required()
        @Length({
            min: 4,
            max: 20
        })
        @StringType({
            regExp: /^\w+$/
        })
        name: string

        @Required()
        @Length({
            min: 6,
            max: 20
        })
        password: string

        @Match({
            property: 'password'
        })
        password2: string

        @Value({
            min: 1,
            max: 100
        })
        age: number

    }


    it('name is null', function (done) {

        let t = new Test();
        t.password = '123456';
        t.password2 = '123456';

        let result = validate(t);

        assert.equal(result.valid, false);
        done();

    })

    it('name length is 3', function (done) {

        let t = new Test();
        t.name = 'nam';
        t.password = '123456';
        t.password2 = '123456';
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('name length is 21', function (done) {

        let t = new Test();
        t.name = 'namnamnamnamnamnamnam';
        t.password = '123456';
        t.password2 = '123456';
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('name is not \w', function (done) {

        let t = new Test();
        t.name = 'nam.';
        t.password = '123456';
        t.password2 = '123456';
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('password is null', function (done) {

        let t = new Test();
        t.name = 'name';
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('password2 not match password', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        let result = validate(t);
        //console.log(result.data);
        assert.equal(result.valid, false);
        done();

    })

    it('name and password ok', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        t.password2 = '123456';
        let result = validate(t);
        assert.equal(result.valid, true);
        done();

    })

    it('name and password ok', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        t.password2 = '123456';
        let result = validate(t);
        assert.equal(result.valid, true);
        done();

    })

    it('age is 0', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        t.password2 = '123456';
        t.age = 0;
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('age is 101', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        t.password2 = '123456';
        t.age = 0;
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('all ok', function (done) {

        let t = new Test();
        t.name = 'name';
        t.password = '123456';
        t.password2 = '123456';
        t.age = 5;
        let result = validate(t);
        assert.equal(result.valid, true);
        done();

    })

})