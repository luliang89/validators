
import 'mocha';
import assert = require('assert');

import { Match, validate } from '../src';


describe('Match', function () {

    describe('is undefined or null', function () {

        class Test {

            @Match({
                value: true,
            })
            assent: boolean

        }

        it('is undefined', function (done) {
            let o = new Test();
            let result = validate(o);
            console.log('aaa',result.valid);
            assert.equal(result.valid, true);
            done();
        })

        it('is null', function (done) {
            let o = new Test();
            o.assent = null;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });

    describe('boolean, value: true', function () {

        class Test {

            @Match({
                value: true,
            })
            assent: boolean

        }

        it('assent is false', function (done) {
            let o = new Test();
            o.assent = false;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('age is true', function (done) {
            let o = new Test();
            o.assent = true;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });

    describe('Date, value:2018/1/20', function () {

        class Test {

            @Match({
                value: new Date(2018, 0, 20)
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
            assert.equal(result.valid, false);
            done();
        })

    });
    
    describe('string, value:a', function () {

        class Test {

            @Match({
                value: 'a'
            })
            name: string

        }

        it('is a', function (done) {
            let o = new Test();
            o.name = 'a';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is ab', function (done) {
            let o = new Test();
            o.name = 'ab';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });
    
    describe('number, value:1', function () {

        class Test {

            @Match({
                value: 1
            })
            age: number

        }

        it('is 1', function (done) {
            let o = new Test();
            o.age = 1;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is 2', function (done) {
            let o = new Test();
            o.age = 2;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });
    
    describe('Array<number>, value:1,2', function () {

        class Test {

            @Match({
                value: [1,2]
            })
            age: number

        }
        
        it('is 0', function (done) {
            let o = new Test();
            o.age = 0;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('is 1', function (done) {
            let o = new Test();
            o.age = 1;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is 2', function (done) {
            let o = new Test();
            o.age = 2;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is 3', function (done) {
            let o = new Test();
            o.age = 3;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

    describe('inverse number, value:1', function () {

        class Test {

            @Match({
                value: 1,
                inverse:true
            })
            age: number

        }

        it('is 1', function (done) {
            let o = new Test();
            o.age = 1;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('is 2', function (done) {
            let o = new Test();
            o.age = 2;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });
    
    describe('inverse Array<number>, value:1,2', function () {

        class Test {

            @Match({
                value: [1,2],
                inverse:true
            })
            age: number

        }
        
        it('is 0', function (done) {
            let o = new Test();
            o.age = 0;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is 1', function (done) {
            let o = new Test();
            o.age = 1;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('is 2', function (done) {
            let o = new Test();
            o.age = 2;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is 3', function (done) {
            let o = new Test();
            o.age = 3;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });

});