describe('assertions', function () {

  it('#status', function () {
    var res = { statusCode: 200 };
    res.should.to.have.status(200);

    (function () {
      res.should.not.have.status(200);
    }).should.throw('expected { statusCode: 200 } to not have status code 200');

    (function () {
      ({}).should.not.to.have.status(200);
    }).should.throw("expected {} to have a property 'statusCode'");
  });

  it('#ip', function () {
    '127.0.0.1'.should.be.an.ip;
    '2001:0db8:85a3:0000:0000:8a2e:0370:7334'.should.be.an.ip;

    (function () {
      '127.0.0.1'.should.not.be.an.ip;
    }).should.throw('expected \'127.0.0.1\' to not be an ip');

    (function () {
      '2001:0db8:85a3:0000:0000:8a2e:0370:7334'.should.not.be.an.ip;
    }).should.throw('expected \'2001:0db8:85a3:0000:0000:8a2e:0370:7334\' to not be an ip');
  });

  it('#header test existence', function () {
    var req = { headers: { foo: 'bar' }};
    var res = {
      getHeader: function (key) {
        return key == 'foo' ? 'bar' : undefined;
      }
    };

    req.should.have.header('foo');
    req.should.not.have.header('bar');

    res.should.have.header('foo');
    res.should.not.have.header('bar');

    (function () {
      req.should.have.header('bar');
    }).should.throw('expected header \'bar\' to exist');

    (function () {
      res.should.have.header('bar');
    }).should.throw('expected header \'bar\' to exist');
  });

  it('#header test value', function () {
    var req = { headers: { foo: 'bar' }};
    var res = {
      getHeader: function (key) {
        return 'foo';
      }
    };

    req.should.have.header('foo', 'bar');
    res.should.have.header('bar', 'foo');

    (function () {
      req.should.not.have.header('foo', 'bar');
    }, 'expected header \'foo\' to not have value bar');

    (function () {
      res.should.not.have.header('bar', 'foo');
    }).should.throw('expected header \'bar\' to not have value foo');
  });

  it('#headers', function() {
    var req = { headers: { foo: 'bar' }};
    var res = {
      getHeader: function (key) {
        return 'foo';
      }
    };

    req.should.have.headers;
    res.should.have.headers;

    (function () {
      req.should.not.have.headers;
    }).should.throw('expected { headers: { foo: \'bar\' } } to not have headers or getHeader method');

    (function () {
      res.should.not.have.headers;
    }).should.throw('expected { getHeader: [Function] } to not have headers or getHeader method');
  });

  it('#json', function() {
    var req = { headers: { 'content-type': [ 'application/json' ] }};
    var res = {
      getHeader: function (key) {
        return 'application/json'
      }
    };

    req.should.be.json;
    res.should.be.json;

    (function () {
      req.should.not.be.json;
    }).should.throw('expected [ \'application/json\' ] to not include \'application/json\'');

    (function () {
      res.should.not.be.json;
    }).should.throw('expected \'application/json\' to not include \'application/json\'');
  });

  it('#text', function() {
    var req = { headers: { 'content-type': [ 'text/plain' ] }};
    var res = {
      getHeader: function (key) {
        return 'text/plain'
      }
    };

    req.should.be.text;
    res.should.be.text;

    (function () {
      req.should.not.be.text;
    }).should.throw('expected [ \'text/plain\' ] to not include \'text/plain\'');

    (function () {
      res.should.not.be.text;
    }).should.throw('expected \'text/plain\' to not include \'text/plain\'');
  });

  it('#html', function () {
    var req = { headers: { 'content-type': [ 'text/html' ] }};
    var res = {
      getHeader: function (key) {
        return 'text/html'
      }
    };

    req.should.be.html;
    res.should.be.html;

    (function () {
      req.should.not.be.html;
    }).should.throw('expected [ \'text/html\' ] to not include \'text/html\'');

    (function () {
      res.should.not.be.html;
    }).should.throw('expected \'text/html\' to not include \'text/html\'');
  });
});
