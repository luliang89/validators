
import 'mocha';
import assert = require('assert');

import { Match, Required, Length, Value, StringType, validate, getPropertyType, Validation } from '../src';

describe('Extends', function () {

    class User {

        @Required()
        name: string

        @Validation({
            item: [{
                name: 'StringType',
                options: {
                    type: 'email'
                }
            }]
        })
        emails: string[]

    }

    class Student extends User {

        @Required()
        grade: string

        studentID: string

        @Validation()
        deskmate: Student

    }

    it('name is null', function (done) {

        let t = new Student();
        t.grade = 'g';
        let result = validate(t);

        //console.log('a',Reflect.getMetadata('design:type', t,'name'));

        assert.equal(result.valid, false);
        done();

    })

    it('name is not null', function (done) {

        let t = new Student();
        t.name = 'n';
        t.grade = 'g';
        let result = validate(t);
        assert.equal(result.valid, true);
        done();

    })

    it('getPropertyType', function (done) {

        let map = getPropertyType(Student.prototype);
        let keys = Object.keys(map);

        //console.log('', map);

        assert.equal(keys.length, 3);
        done();

    })

    it('deskmate.name is null', function (done) {

        let d = new Student();
        d.grade = 'g';

        let t = new Student();
        t.name = 'n';
        t.grade = 'g';
        t.deskmate = d;
        let result = validate(t);
        assert.equal(result.valid, false);
        done();

    })

    it('emails[1] is not email', function (done) {

        let u = new User();
        u.name = 'u';
        u.emails = ['a@a.com', 'aaa'];

        let result = validate(u);

        console.log('validation', result.data);
        assert.equal(result.valid, false);
        done();

    })

})
