"use strict";var gitProfiler=angular.module("gitProfileApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]);angular.module("gitProfileApp").controller("MainCtrl",["UserFactory","ListRepos","PagerFactory","$anchorScroll",function(a,b,c,d){var e=new a,f=new c,g=this;g.currentPage=1,this.fetchProfile=function(a){g.currentPage=1,e.getRepos(a).then(function(a){g.entry=a,b.parseUrl(g.entry.repos_url+"?page=1&per_page=5").then(function(a){g.reposList=a.data})})},this.changePage=function(a){f.guardPrevious(a,g),f.guardNext(a,g),b.parseUrl(g.entry.repos_url+"?page="+a+"&per_page=5").then(function(a){g.reposList=a.data}),d()}}]),angular.module("gitProfileApp").controller("AboutCtrl",function(){this.email="admin@hecticmojo.com"}),gitProfiler.factory("UserFactory",["$http",function(a){var b="https://api.github.com/",c=function(){};return c.prototype.getRepos=function(c){var d=this;return a.get(b+"users/"+c).then(function(a){return d.profile=a.data,d.profile})["catch"](function(a){throw a.status})},c}]),gitProfiler.service("ListRepos",["$http",function(a){var b=this;this.parseUrl=function(c){return a.get(c).then(function(a){return b.repoList=a,b.repoList})["catch"](function(a){throw a.status})}}]),gitProfiler.factory("PagerFactory",function(){var a=function(){};return a.prototype.guardPrevious=function(a,b){var c=b;a>0?(c.currentPage=a,$("#previous_button").prop("disabled",!1)):(c.currentPage=1,$("#previous_button").prop("disabled",!0))},a.prototype.guardNext=function(a,b){var c=b;a>=Math.round(c.entry.public_repos/5)?(c.currentPage=Math.round(c.entry.public_repos/5),$("#next_button").prop("disabled",!0)):$("#next_button").prop("disabled",!1)},a}),angular.module("gitProfileApp").run(["$templateCache",function(a){a.put("views/about.html",'<h4>Marco Bagnasco</h4> <a href="https://github.com/marcocode">GitHub</a> <p>admin@hecticmojo.com</p>'),a.put("views/main.html",'<div class="jumbotron"> <span> <h4>Built For:</h4> <img src="images/smart.ebb68dab.png" alt="smart_p"></span><br> <label ng-show="main.reposList"> Filter: <input type="text" ng-model="query" placeholder="language, year etc..."> </label> <div class="list_container"> <ul id="repos_list" ng-repeat="repo in main.reposList | filter:query"> <a ng-href="{{repo.html_url}}"><div class="repo_container"> <li> Name: {{repo.name}} <span class="glyphicon"> Description: {{repo.description}} </span> Fork: {{repo.fork}} <span class="glyphicon"> Created: {{repo.created_at}} </span> Language: {{repo.language}} <span class="glyphicon"> Size: {{repo.size}} </span> </li> </div></a> </ul> </div> <div class="row form_field"> <h4>Type a GitHub user or organisation</h4> <h4>to browse public repositories:</h4> <div class="search_field"> <form id="profile_form"> <input id="search_form" type="text" ng-model="main.username" name="username"> <input id="search_button" class="btn btn-lg btn-success" type="submit" value="Search" ng-click="main.fetchProfile(main.username)"> </form> </div> </div> <div class="pagination" ng-show="main.reposList"> <button id="previous_button" class="btn btn-md" value="Previous" ng-click="main.changePage(main.currentPage - 1)">Prev</button> <div class="btn btn-md">{{main.currentPage}}</div> <button id="next_button" class="btn btn-md" value="Previous" ng-click="main.changePage(main.currentPage + 1)">Next</button> </div> </div>')}]);