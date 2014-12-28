!function(){"use strict";angular.module("auction",["ngRoute","restangular"]).config(["$routeProvider",function(a){var b=function(a){return a+" | Auction"};a.when("/",{templateUrl:"views/home.html",controller:"HomeController",controllerAs:"ctrl",title:b("Home")}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",controllerAs:"ctrl",title:b("Search"),reloadOnSearch:!1}).when("/product/:productId",{templateUrl:"views/product.html",controller:"ProductController",controllerAs:"ctrl",title:b("Product Details"),resolve:{product:["$route","ProductService",function(a,b){var c=parseInt(a.current.params.productId);return b.getProductById(c)}]}}).otherwise({redirectTo:"/"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("http://private-anon-44b976eb9-webauctionv1.apiary-mock.com"),a.addResponseInterceptor(function(a,b){var c;return"getList"===b?(c=a.items,c.meta=a.items):c=a,c})}]).run(["$rootScope","SearchFormService",function(a,b){a.$on("$routeChangeSuccess",function(c,d){a.pageTitle=d.title,b.applyLocationParams(d.params)})}])}(),function(){"use strict";var a=function(a){var b=this;b.products=[],a.getProducts().then(function(a){console.log(a),b.products=a})};a.$inject=["ProductService"],angular.module("auction").controller("HomeController",a)}(),function(){"use strict";var a=function(a,b){this.product=a,this.searchForm=b};a.$inject=["product","SearchFormService"],angular.module("auction").controller("ProductController",a)}(),function(){"use strict";var a=function(a,b){var c=this;c.products=[],this.searchForm=b;var d=b.getParamsByModel();a.find(d).then(function(a){c.products=a})};a.$inject=["ProductService","SearchFormService"],angular.module("auction").controller("SearchController",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"A",link:function(a,b){b.datepicker({startDate:"-0d",todayBtn:!0})}}};angular.module("auction").directive("auctionDatepicker",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/FooterDirective.html"}};angular.module("auction").directive("auctionFooter",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/NavbarDirective.html",controller:["$location","$route","SearchFormService",function(a,b,c){this.product="",this.location=a,this.route=b,this.SearchFormService=c,this.submitBtn=function(){this.location.path("/search").search({}).search("product",this.product),this.product="",this.route.reload()}}],controllerAs:"navbarCtrl"}};angular.module("auction").directive("auctionNavbar",a)}(),function(){"use strict";var a=function(){return{scope:{minPrice:"@",maxPrice:"@",lowPrice:"=",highPrice:"="},restrict:"E",templateUrl:"views/partial/PriceRangeDirective.html",link:function(a,b){var c=angular.element(b).find("input[type=text]"),d=a.minPrice||0,e=a.maxPrice||500;a.lowPrice=a.lowPrice||d,a.highPrice=a.highPrice||e,c.slider({min:d,max:e,value:[a.lowPrice,a.highPrice]}),c.on("slideStop",function(b){a.$apply(function(){a.lowPrice!==b.value[0]&&(a.lowPrice=b.value[0]),a.highPrice!==b.value[1]&&(a.highPrice=b.value[1])})});var f=function(){return c.slider("getValue")},g=function(a,b){c.slider("setValue",[a,b])};a.$watch("lowPrice",function(a){g(a||d,f()[1])}),a.$watch("highPrice",function(a){g(f()[0],a||e)})}}};angular.module("auction").directive("auctionPriceRange",a)}(),function(){"use strict";var a=function(){return{scope:!1,restrict:"E",templateUrl:"views/partial/SearchFormDirective.html"}};angular.module("auction").directive("auctionSearchForm",a)}(),function(){"use strict";var a=function(a){this.Restangular=a};a.$inject=["Restangular"],a.prototype={getProducts:function(){return console.log("call getProd"),this.Restangular.all("product/featured").getList()},find:function(a){return this.Restangular.all("product/search").getList(a)},getProductById:function(a){return this.Restangular.one("product",a).get()}},angular.module("auction").service("ProductService",a)}(),function(){"use strict";var a,b,c=new Date,d={product:"",category:"",maxCloseDate:c.getMonth()+"/"+c.getDate()+"/"+c.getFullYear(),numOfBids:4,lowPrice:0,highPrice:500},e=function(a){for(var b in d)a[b]=d[b]},f=function(c,d){a=d,b=c,e(this)};f.prototype={getParamsByModel:function(){var a={};for(var b in this){var c=typeof this[b];"string"!==c&&"number"!==c||!this[b]||this[b]===d[b]||(a[b]=this[b])}return a},submitBtn:function(){var c=this.getParamsByModel();"/search"!==b.path()?b.search(c).path("/search"):(b.search(c),a.find(c))},applyLocationParams:function(a){if("/search"===b.$$path&&a){e(this);for(var c in a)c in d&&("number"==typeof d[c]?this[c]=parseFloat(a[c]):"string"==typeof d[c]&&(this[c]=a[c]))}}},angular.module("auction").service("SearchFormService",["$location","ProductService",f])}();