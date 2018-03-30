
import 'mocha';
import assert = require('assert');

import { Length, validate } from '../src';


describe('Length', function () {

    describe('is undefined or null', function () {

        class StringLength {

            @Length({
                min: 1,
                max: 3
            })
            name: string

        }

        it('is undefined', function (done) {
            let o = new StringLength();
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is null', function (done) {
            let o = new StringLength();
            o.name = null;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    });

    describe('string length, min:1 max:3', function () {

        class StringLength {

            @Length({
                min: 1,
                max: 3
            })
            name: string

        }

        it('length is 0', function (done) {
            let o = new StringLength();
            o.name = '';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('length is 1', function (done) {
            let o = new StringLength();
            o.name = '1';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('length is 4', function (done) {
            let o = new StringLength();
            o.name = '1111';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

    describe('array length, min:1 max:3', function () {

        class ArrayLength {

            @Length({
                min: 1,
                max: 3
            })
            names: string[]

        }

        it('length is 0', function (done) {
            let o = new ArrayLength();
            o.names = [];
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('length is 1', function (done) {
            let o = new ArrayLength();
            o.names = ['1'];
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('length is 4', function (done) {
            let o = new ArrayLength();
            o.names = ['1', '2', '2', '2'];
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

    describe('string length, exact:1', function () {

        class StringLength {

            @Length({
                exact: 1
            })
            name: string

        }

        it('length is 0', function (done) {
            let o = new StringLength();
            o.name = '';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('length is 1', function (done) {
            let o = new StringLength();
            o.name = '1';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('length is 2', function (done) {
            let o = new StringLength();
            o.name = '11';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

    describe('array length, exact:1', function () {

        class ArrayLength {

            @Length({
                exact: 1
            })
            names: string[]

        }

        it('length is 0', function (done) {
            let o = new ArrayLength();
            o.names = [];
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('length is 1', function (done) {
            let o = new ArrayLength();
            o.names = ['1'];
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('length is 2', function (done) {
            let o = new ArrayLength();
            o.names = ['1', '2'];
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    });

});