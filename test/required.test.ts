
import 'mocha';
import assert = require('assert');

import { Required, validate } from '../src';

describe('Required', function () {

    describe('no depends', function () {

        class Empty {

            @Required()
            id: any
        }

        it('id is undefined', function (done) {
            let o = new Empty();
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        });

        it('id is null', function (done) {
            let o = new Empty();
            o.id = null;
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        });

        it('id is string', function (done) {
            let o = new Empty();
            o.id = '';
            let result = validate(o);
            //console.log('',result.properties);
            assert.equal(result.valid, true);
            done();
        });

        it('id is number', function (done) {
            let o = new Empty();
            o.id = 1;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        });

    });

    describe('depends is a string, id', function () {

        class DependsString {

            id: any

            @Required({
                depends: 'id'
            })
            name: string

        }

        it('id has value, name no value', function (done) {
            let o = new DependsString();
            o.id = '';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        });

        it('id and name no value', function (done) {
            let o = new DependsString();
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        });

        it('id no value, name has value', function (done) {
            let o = new DependsString();
            o.name = '';
            let result = validate(o);
            //console.log('',result.properties);
            assert.equal(result.valid, true);
            done();
        });

    });

});