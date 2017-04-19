var Q = require("q");
var rp = require('request-promise');
//require('request-promise').debug = true;

module.exports = function () {

    this.username = "";
    this.password = "";

    this.init = function (config_json) {
        this.username = config_json.username;
        this.password = config_json.password;
        this.url=config_json.url;
    }
    this.search = function (search_params) {
        var deferred = Q.defer();
        var params = search_params;
        var options = this.build_get_request(params, "Bug.search");

        rp(options).then(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
    this.get_bug = function (bug_id) {
        var deferred = Q.defer();
        var params = [{ "ids": [bug_id] }];
        var options = this.build_get_request(params, "Bug.get");
        //console.log(JSON.stringify(options));
        var self=this;

        rp(options).then(function (data) {
        self.get_comments(bug_id).then(function(comments){
            deferred.resolve(data);
        });
           // console.log("request was good");
           // deferred.resolve(data);
        });
        return deferred.promise;
    }
    this.get_comments = function (bug_id) {

        var deferred = Q.defer();
        var params = [{ "ids": [bug_id] }];
        var options = this.build_get_request(params, "Bug.comments");
        rp(options).then(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    this.build_get_request = function (params,method) {
        var query_string = {
            "username": this.username,
            "password": this.password,
            "method": method,
            "params": JSON.stringify(params)
        };
       
        var options = {
            uri: this.url,
            method: 'GET',
            qs:query_string// Automatically stringifies the body to JSON
        };
        return options;
    }
};
