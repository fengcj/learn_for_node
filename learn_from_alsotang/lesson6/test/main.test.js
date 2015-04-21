var main = require("../main");
var should = require("should");

describe("test/main.test.js",function(){
	it("should equal 0 when n === 0",function(){
		main.fibonacci(0).should.equal(0);
	})
});