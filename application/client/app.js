'use strict';

var app = angular.module('application', []);

app.controller('AppCtrl', function ($scope, appFactory) {
    $("#success_init").hide();
    $("#success_invoke").hide();
    $("#success_query").hide();
    $("#success_query_admin").hide();
    $("#success_delete").hide();
    $("#success_payment").hide();
    $("#success_buyMusic").hide();

    $scope.initAB = function () {
        $("#success_init").hide();
        appFactory.initAB($scope.abstore, function (data) {
            if (data == "")
                $scope.init_ab = "success";
            $("#success_init").show();
        });
    }
    $scope.transferAB = function () {
        $("#success_transfer").hide();
        let data = {
            sender: $scope.transfer.sender,
            receiver: $scope.transfer.receiver,
            amount: $scope.transfer.amount
        }
        appFactory.transferAB(data, function (response) {
            if (response == "") $scope.transfer_ab = "success";
            $("#success_transfer").show();
        });
    }
    $scope.musicRegister = function () {
        $("#success_musicRegister").hide();
        appFactory.musicRegister($scope.musicRegister, function (data) {
            if (data == "")
                $scope.musicRegister = "success";
            $("#success_musicRegister").show();
        });
    }

    $scope.buyMusic = function () {
        $("#success_buyMusic").hide();
        let data = {
            buyer: $scope.buyMusic.buyer,
            seller: $scope.buyMusic.seller,
            sellerItem: $scope.buyMusic.sellerItem
        };
        appFactory.buyMusic(data, function (response) {
            if (response == "") {
                $scope.buyMusic_status = "success";
                $("#success_buyMusic").show();
            }
        });
    };

    $scope.invokeAB = function () {
        $("#success_invoke").hide();
        appFactory.invokeAB($scope.invoke, function (data) {
            if (data == "")
                $scope.invoke_ab = "success";
            $("#success_invoke").show();
        });
    }
    $scope.queryAB = function () {
        $("#success_query").hide();
        appFactory.queryAB($scope.walletid, function (data) {
            $scope.query_ab = data;

            $("#success_query").show();
        });
    }

    $scope.querySession = function () {
        appFactory.querySession(function (data) {
            $scope.sessionData = data;
            console.log('Session Data:', data);
        });
    };
    $scope.queryAdmin = function () {
        $("#success_query_admin").hide();
        appFactory.queryAB("admin", function (data) {
            $scope.query_admin = data;
            $("#success_query_admin").show();
        });
    }
    $scope.deleteAB = function () {
        $("#success_delete").hide();
        appFactory.deleteAB($scope.deleteid, function (data) {
            if (data == "")
                $scope.delete_ab = "success";
            $("#success_delete").show();
        });
    }
    $scope.rechargeAB = function () {
        $("#success_recharge").hide();
        let data = {
            user: $scope.recharge.user,
            amount: $scope.recharge.amount
        };
        appFactory.rechargeAB(data, function (response) {
            if (response == "")
                $scope.recharge = "success";
            $("#success_recharge").show();
        });
    };
    $scope.refundAB = function(){
        $("#success_refund").hide();
        let data = {
            user: $scope.refund.user,
            amount: $scope.refund.amount
        }
        appFactory.refundAB(data, function(response){
            if(response == "")
            $scope.refund = "success";
            $("#success_refund").show();
        });
    }

});
app.factory('appFactory', function ($http) {

    var factory = {};

    factory.initAB = function (data, callback) {
        $http.get('/init?user=' + data.user).success(function (output) {
            callback(output)
        });
    }
    factory.invokeAB = function (data, callback) {
        $http.get('/invoke?sender=' + data.sender + '&receiver=' + data.receiver + '&amount=' + data.amount).success(function (output) {
            callback(output)
        });
    }
    factory.transferAB = function (data, callback) {
        $http.get('/transfer?sender=' + data.sender + '&receiver=' + data.receiver + '&amount=' + data.amount).success(function (output) {
            callback(output.data)
        });
    }
    factory.musicRegister = function (data, callback) {
        $http.get('/musicregister?seller=' + data.seller + '&music=' + data.music + '&price=' + data.price).success(function (output) {
            callback(output)
        });
    }
    factory.buyMusic = function (data, callback) {
        $http.get('/buymusic?buyer=' + data.buyer + '&seller=' + data.seller + '&musicName=' + data.sellerItem).success(function (output) {
            callback(output);
        });
    };
    factory.queryAB = function (name, callback) {
        $http.get('/query?name=' + name).success(function (output) {
            callback(output)
        });
    }
    factory.deleteAB = function (name, callback) {
        $http.get('/delete?name=' + name).success(function (output) {
            callback(output)
        });
    }
    // factory.rechargeAB = function(data, callback){
    //     $http.get('/recharge?user='+data.user+'&amount='+data.amount).success(function(output){
    //       callback(output)
    //     });
    // }
    factory.rechargeAB = function (data, callback) {
        $http.post('/recharge', data).success(function (output) {
            callback(output);
        });
    };
    factory.refundAB = function (data, callback){
        $http.post('/refund', data).success(function (output){
          callback(output)
        });
    }
    
    factory.querySession = function(callback){
        $http.get('/session').success(function(output){
            callback(output);
        });
    };

    return factory;
});
