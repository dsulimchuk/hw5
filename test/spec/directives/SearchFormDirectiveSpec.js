'use strict';
describe('Directive: SearchFormDirective', function() {
    var el;

    beforeEach(module('auction'));
    beforeEach(module('views/partial/SearchFormDirective.html'));
    beforeEach(module('views/partial/PriceRangeDirective.html'));


    beforeEach(inject(function($compile, $rootScope, $templateCache){
        el = angular.element('<auction-search-form></auction-search-form>');
        el = $compile(el)($rootScope);
        //dump($templateCache.get('views/partial/SearchFormDirective.html'));
        $rootScope.$digest();
        //dump(el);

    }));
    it('Inner HTML after digest must start with <form name="searchForm"', function() {
        //dump(el[0].innerHTML);
        //dump(navbar.children());
        expect(el[0]).toBeDefined();
        expect(el[0].innerHTML.indexOf('<form name="searchForm"')).toBe(0);
    });
})