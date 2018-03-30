
import 'mocha';
import assert = require('assert');

import { StringType, validate } from '../src';


describe('String', function () {

    describe('is undefined or null', function () {

        class Test {

            @StringType({
                type: 'email',
            })
            email: string

        }

        it('is undefined', function (done) {
            let o = new Test();
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

        it('is null', function (done) {
            let o = new Test();
            o.email = null;
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    })
    
    describe('type email', function () {

        class Test {

            @StringType({
                type: 'email',
            })
            email: string

        }

        it('is a', function (done) {
            let o = new Test();
            o.email = 'a';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is a@a', function (done) {
            let o = new Test();
            o.email = 'a@a';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is @a.com', function (done) {
            let o = new Test();
            o.email = '@a.com';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is a@a.com', function (done) {
            let o = new Test();
            o.email = 'a@a.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is a@a.com.cn', function (done) {
            let o = new Test();
            o.email = 'a@a.com.cn';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    })
    
    describe('type url', function () {

        class Test {

            @StringType({
                type: 'url',
            })
            url: string

        }

        
        it('is aaa/bb', function (done) {
            let o = new Test();
            o.url = 'aaa/bb';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

        it('is www.baidu.com', function (done) {
            let o = new Test();
            o.url = 'www.baidu.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is http://www.baidu.com', function (done) {
            let o = new Test();
            o.url = 'http://www.baidu.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is https://news.163.com', function (done) {
            let o = new Test();
            o.url = 'https://news.163.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is 163.com', function (done) {
            let o = new Test();
            o.url = '163.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        
        it('is g.cn', function (done) {
            let o = new Test();
            o.url = 'g.cn';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is http://g.cn', function (done) {
            let o = new Test();
            o.url = 'http://g.cn';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is https://www.baidu.com/link?url=8jPrtuQKZeP4ef6uWSGPw-tQdoh0BYndEbP2OVI-BSZYVXaeL99RncWJ6Y6PZhw-&wd=&eqid=c35f60fd00013d66000000065a6aeecb', function (done) {
            let o = new Test();
            o.url = 'https://www.baidu.com/link?url=8jPrtuQKZeP4ef6uWSGPw-tQdoh0BYndEbP2OVI-BSZYVXaeL99RncWJ6Y6PZhw-&eqid=c35f60fd00013d66000000065a6aeecb';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is ftp://dc.ifood360.com', function (done) {
            let o = new Test();
            o.url = 'ftp://dc.ifood360.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    })

    describe('type ip', function () {

        class Test {

            @StringType({
                type: 'ip',
            })
            url: string

        }

        it('is www.baidu.com', function (done) {
            let o = new Test();
            o.url = 'www.baidu.com';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is a@a.com', function (done) {
            let o = new Test();
            o.url = 'a@a.com';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is 192.168.0.61', function (done) {
            let o = new Test();
            o.url = '192.168.0.61';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is 192.168.0.', function (done) {
            let o = new Test();
            o.url = '192.168.0.';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })

    })

    describe('type regExp: /^a/', function () {

        class Test {

            @StringType({
                regExp: /^a/,
            })
            url: string

        }

        it('is www.baidu.com', function (done) {
            let o = new Test();
            o.url = 'www.baidu.com';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is a@a.com', function (done) {
            let o = new Test();
            o.url = 'a@a.com';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })
        
        it('is b', function (done) {
            let o = new Test();
            o.url = 'b';
            let result = validate(o);
            assert.equal(result.valid, false);
            done();
        })
        
        it('is a', function (done) {
            let o = new Test();
            o.url = 'a';
            let result = validate(o);
            assert.equal(result.valid, true);
            done();
        })

    })

})