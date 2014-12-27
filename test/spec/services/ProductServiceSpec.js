'use strict';
describe('Service: ProductService', function(){
    var fakeRespond = [{
        'id'          : 3,
        'title'       : 'Item 3',
        'thumb'       : '03.jpg',
        'description' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore adipiscing elit. Ut enim.',
        'timeleft'    : 2,
        'watchers'    : 12,
        'price'       : 39
    },
        {
            'id'          : 4,
            'title'       : 'Item 4',
            'thumb'       : '04.jpg',
            'description' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore adipiscing elit. Ut enim.',
            'timeleft'    : 2,
            'watchers'    : 12,
            'price'       : 72
        }];
    var srv,
        httpB;

    beforeEach(angular.mock.module("restangular"));
    beforeEach(module('auction'));

    beforeEach(inject(function(_$httpBackend_, ProductService){
        srv = ProductService;
        httpB =_$httpBackend_;
        //for getProduct
        httpB.whenGET(/data\/products(\.json)?$/i).respond(fakeRespond);
        //for find
        httpB.whenGET(/data\/products(\.json)?\?/i).respond(fakeRespond.concat(fakeRespond));
        //for getProduct
        httpB.whenGET(/data\/products\/\d+(\.json)/i).respond(_.rest(fakeRespond));


    }));

    it('getProducts method should return array', function(){
        httpB.expectGET(/data\/products(\.json)?$/i);
        srv.getProducts().then(function(result){
            expect(result.length).toBe(2);
        });
        httpB.flush();
    });

    it('find method should return array', function(){
        httpB.expectGET(/data\/products(\.json)?\?/i);
        srv.find({ggg: 222}).then(function(result){
            expect(result.length).toBe(4);
        });
        httpB.flush();
    });

    it('getProductById method should return one element', function(){
        httpB.expectGET(/data\/products\/\d+(\.json)/i);
        srv.getProductById(222).then(function(result){
            expect(result.length).toBe(1);
        });
        httpB.flush();
    });

    afterEach(function() {
        httpB.verifyNoOutstandingExpectation();
        httpB.verifyNoOutstandingRequest();
    });
});