'use strict';
/* TODO List:
1 - Add the reply functionality
2 - Convert old nodes into active text holding nodes
3 - Get and store post data.
4 - Add random selection of images
Note - front-end validation did not work with EITHER method. Remarkable.
*/
var brianSays = angular.module('briansaysApp', []);

brianSays.controller('MainCtrl', function ($compile, $scope, $http) {
    $scope.diceRoll = 6;
    /*$http.post('/comment', replyMessage).
        success(function (data) {
          comment.reply.push(data);
          $scope.reply = {}; // setPristine not cooperative with a repeated form, even when passing in form object.
          $scope.state.selected = null; // Removes reply form.
          $scope.$broadcast('commentPosted');
          function removeNotification() {
            $scope.$broadcast('removeNotification');
          }
          $timeout(removeNotification, 4000);
    }). 
    error(function ( ) {
        $location.path('/error');
    });*/
    $scope.addBrian = function() {
        var thisComment = $scope.commentText;
        $('section form textarea').replaceWith("<p>" + thisComment + "</p>");
        $('section form button').remove();
        var el = $compile("<brian></brian>")($scope);
        $('.container').append(el);
        $scope.commentText = "";
    

    /*  Method Two : Server Based
    var thisComment = {
            "comment": $scope.commentText
        };
        $http.post('/comment', thisComment).
            success(function (data) {
                console.log(data);
                $('section form textarea').replaceWith("<p>" + data + "</p>");
                $('section form button').remove();
                var el = $compile("<brian></brian>")($scope);
                $('.container').append(el);
            }).
            error(function () {
                console.log("D'oh!");
            });
    */   
    };
    $scope.addReply = function() {
      var el = $compile("<reply></reply>")($scope);
      $('.container').append(el);
    };
});

brianSays.directive('brian', function() {
    var definitionObj = {
        template: '<section>' +
                    '<img src="../images/Brians/{{image}}.jpg" class="{{picOrientation}}"/>' +
                    '<form class="bsTextBubble {{textOrientation}}">' +
                      '<textarea ng-model="commentText" required autofocus></textarea>' +
                      '<button type="submit" ng-click="addBrian()">Brian Says</button>' +
                      '<button type="submit" ng-click="addReply()">You Reply</button>' +
                    '</form>' +
                   '</section>',  
        scope: true,
        restrict: 'E',
        link: function ($scope) {
            var brians = ['After_Work', 'Smug', 'Napoleon', 'Halo', 'Sideburns', 'Squint', 'Roman', 'Charming'];
            $scope.image = brians[$scope.diceRoll];
            if($scope.image === brians[0] || $scope.image === brians[1] || $scope.image === brians[2] || $scope.image === brians[3]) {
                $scope.picOrientation = 'leftOrientation';
                $scope.textOrientation = 'leftBubble';
            } else {
                $scope.picOrientation = 'rightOrientation';
                $scope.textOrientation = 'rightBubble';
            }  
        },
    };
    return definitionObj;
});
/*
brianSays.directive('reply', function() {
    var definitionObj = {
        template: '<section>' +
                    '<img src="../images/Replies/{{image}}.jpg" class="{{picOrientation}} replyPic"/>' +
                    '<form class="bsTextBubble {{textOrientation}}">' +
                      '<textarea></textarea>' +
                      '<button type="submit" ng-click="addBrian()">Brian Says</button>' +
                      '<button type="submit" ng-click="addReply()">You Reply</button>' +
                    '</form>' +
                   '</section>',  
        scope: true,
        restrict: 'E',
        link: function ($scope, $element, $attrs) {
            var replies = ['HungryPanda', 'DJOctopus', 'HappyLizard', 'SadKangaroo', 'PunkDuck', 'ShockedFrog', 'HighbrowHawk', 'GoofyJaguar'];
            $scope.image = replies[1];
            if($scope.image === replies[0] || $scope.image === replies[1] || $scope.image === replies[2] || $scope.image === replies[3]) {
                $scope.picOrientation = 'leftOrientation';
                $scope.textOrientation = 'leftBubble';
            } else {
                $scope.picOrientation = 'rightOrientation';
                $scope.textOrientation = 'rightBubble';
            }
            
        },
    };
    return definitionObj;
}); */