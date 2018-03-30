
import 'mocha';
import assert = require('assert');

import { Value, validate } from '../src';


describe('Value', function () {

    describe('is undefined or null', function () {

        class Test {

            @Value({
                min: 18,
                max: 100
            })
            age: number

        }

        it('is undefined', function (done) {
            let o = new Test();
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is null', function (done) {
            let o = new Test();
            o.age = null;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });

    describe('number, min:1, max:100', function () {

        class Test {

            @Value({
                min: 1,
                max: 100
            })
            age: number

        }

        it('age is 0', function (done) {
            let o = new Test();
            o.age = 0;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('age is 1', function (done) {
            let o = new Test();
            o.age = 1;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('age is 100', function (done) {
            let o = new Test();
            o.age = 100;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('age is 101', function (done) {
            let o = new Test();
            o.age = 101;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

    describe('Date, min:2018/1/20, max:2018/1/25', function () {

        class Test {

            @Value({
                min: new Date(2018, 0, 20),
                max: new Date(2018, 0, 25)
            })
            birthday: Date

        }

        it('birthday is 2018/1/19', function (done) {
            let o = new Test();
            o.birthday = new Date(2018, 0, 19);
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('birthday is 2018/1/20', function (done) {
            let o = new Test();
            o.birthday = new Date(2018, 0, 20);
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('birthday is 2018/1/25', function (done) {
            let o = new Test();
            o.birthday = new Date(2018, 0, 25);
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('birthday is 2018/1/26', function (done) {
            let o = new Test();
            o.birthday = new Date(2018, 0, 26);
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

});