'use strict';

var brianSays = angular.module('briansaysApp', []);

brianSays.controller('MainCtrl', function ($compile, $scope, $http) {
    $scope.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    $scope.addBrian = function () { // Refactor addBrian and addReply to just notify whether they are Brian or Reply
        var reply = { 
            'message': $scope.commentText
        }
        $http.post('/comment', reply).
            success(function (data) {
                $('section form textarea').replaceWith("<p>" + data + "</p>");
                $('section form button').remove();
                var el = $compile("<brian></brian>")($scope);
                $('.container').append(el);
                $scope.commentText = "";
            }).
            error(function () {
                console.log("D'oh!");
            }
        );
    }
    $scope.addReply = function() {

    };
});

brianSays.directive('brian', function() { // Rename this directive to something more generic
    var definitionObj = {
        template: '<section class="{{image}}">' +
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
            var brians = ['After_Work', 'Smug', 'Napoleon', 'Halo', 'Sideburns', 'Squint', 'Roman', 'Charming'],
                replies = ['HungryPanda', 'DJOctopus', 'HappyLizard', 'SadKangaroo', 'PunkDuck', 'ShockedFrog', 'HighbrowHawk', 'GoofyJaguar'];
            $scope.image = brians[$scope.getRandom(0, 7)];
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

/* Do two on two nested conditionals based on what sort of event it gets
If reply : add replyPic to picOrientation

*/
/* Future Annotations:
Major Challenges of this code : fighting redundancy and fighting complexity */