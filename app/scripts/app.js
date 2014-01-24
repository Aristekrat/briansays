'use strict';
/*  Overview Comments
-Without comments the code for this file would be under 100 lines, and this is this file is the primary workhorse for the application.
-This file is fully linted according to JSLint. I'm a pro-Crockford JS developer. I understand that some of the styles he advocates aren't strictly necessary, 
but I still feel like following the rigid structure of JSLint helps me be a disciplined JS programmer. Although I will ++ increment. Abandoning that is just heresy.
    Major JS Challenges of this Application
-Managing redunancy. This application has many mostly similar but slightly different components. I had to think carefully about ways to inject the differences without
creating a bloated mess.
-Bugs overcome:
    Curse you Camelcasing conversion!! Javascript will not tolerate the dash (-) character mixed in with expressions. It's a reserved character for decrementing. Thus, most multi-word
    functions and variables (other than constructors and constants) are camelCased. However, Angular.js likes to add dashes to everything in it's HTML. It automatically 
    converts camel cased javascript to a dashed-name in the HTML. I knew that before I started making this application, but this is the first time that bit of trickiness
    kicked me in the shins. Evidently it doesn't produce any error message. So I battled a bug long and hard when all I needed to do was just change from camelCase to camel-case. 
*/
var brianSays = angular.module('briansaysApp', []);

brianSays.controller('MainCtrl', ['$compile', '$scope', '$http', function ($compile, $scope, $http) {
    /* Function explanation: getRandom
        This short, easily reusable function is the cleanest of any here. It simply takes a range as two parameters (min & max) then returns a random number
    */
    $scope.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /* Function Explanation: getDefaultText
        This application handles when a user doesn't enter text into the textarea. Normally, I would reject empty fields with both client-side and server-side validation.
        Indeed, I do that in the Bishenwall's code. However, I wanted to maximize user freedom for briansays, so instead I just supply default text by selecting an item
        from the fillerOptions array. A set of 8 possible options, just like everything else. 
    */
    $scope.getDefaultText = function () {
        var fillerOptions = [
            "Weeeeee!",
            "Make that button dance!",
            "Aside from coding, the things I love the most might be Rock 'N Roll and bread. Strange combination, I know.",
            "Where we're going, we don't need user supplied text.",
            "Did you know Napoleon wasn't actually short for his time? He was 5'7, which was normal for the 1700s. He was usually accompanied by massive bodyguards which made him appear shorter. Add in some vile British propaganda and you have a historical myth.",
            "I got married on the same day as one of these pictures, can you guess which one?",
            "My references from my legal career include a senior judge and a current member of the Colorado House of Representatives.",
            "Before I started my technical career, I passed the Oregon bar and took a job parsing incredibly complex financial documents. My record of successfully learning difficult new skills is unimpeachable.",
        ];
        return fillerOptions[$scope.getRandom(0, 7)];
    };
    /* Function Explanation: createComment 
        This function does the actual work of appending my textbubble directive to the DOM. It first checks whether it will be using default text or if the user has supplied text.
        Then it removes the textarea input and adds a static text paragraph. Then it removes the submit button to complete it's transition to a static element. 
        Finally, it creates and then appends the element onto the main DOM element, container.

        I thought about making createComment a service, but ultimately decided against it. According to the Angular.js Docs, services are supposed to be small, reusable bits of
        functionality. createComment seemed much too idiosyncratic. 
    */
    $scope.createComment = function (message) {
        if (message === undefined) {
            $('section ng-form textarea').replaceWith("<p>" + $scope.getDefaultText() + "</p>");
        } else {
            $('section ng-form textarea').replaceWith("<p>" + message + "</p>");
        }
        $('section ng-form button').remove();
        var el = $compile('<textbubble add-brian="addBrian(message)" add-reply="addReply(message)" req-type="{{reqType}}" get-random="getRandom(0,7)"></textbubble>')($scope);
        $('.container').append(el);
    };
    /* Function Explanation: addBrian & addReply
        These two are essentially the same. They announce to the textbubble directive which comment type the user has requested. 
        After that, they call createComment to actually add the new element.
    */
    $scope.addBrian = function (message) {
        $scope.reqType = 'brian';
        $scope.createComment(message);
    };
    $scope.addReply = function (message) {
        $scope.reqType = 'reply';
        $scope.createComment(message);
    };
}]); /* Perhaps you're wondering what's with the strange array [ ] notation surrounding my controller. It protects angular.js variables like $scope from
        being mangled during minification. */

/* Directive Explanation: textbubble
    textbubble is a big, omni-directive. Everything you see on the application, other than the introductory text in the header, is a mutation of textbubble.
    Normally, I wouldn't create one large directive to do everything. However, the different comment permutations were very similar to each other except for a few small details. 
    Thus, I felt it didn't make sense to break apart textbubble into smaller chunks like I normally would. 
*/
brianSays.directive('textbubble', function () { //explain this directive heavily.
    return {
        scope: {
            addBrian: '&addBrian',
            addReply: '&addReply',
            getRandom: '&getRandom',
            reqType: '@reqType',
            initial: '@initial'
        },
        /*  Angular Note: this directive mostly can't see other parts of the application. It can understand the three functions (addBrian, addReply, and getRandom) through the &scope.
            It can read the values on the request
        */
        restrict: 'E',
        template: '<section class="{{image}}">' + // This block allows for very precise styling, allowing me to easily deal with oddball images like the Napoleon image.
                    '<img src="../images/{{image}}.jpg" class="{{picOrientation}}"/>' +
                    '<ng-form novalidate name="bsForm" class="bsTextBubble {{textOrientation}}">' +
                      '<textarea ng-model="commentText" placeholder="{{initial}}" autofocus maxlength="3000"></textarea>' +
                      '<button type="submit" ng-click="addBrian({message:commentText})">Brian Says</button>' +
                      '<button type="submit" ng-click="addReply({message:commentText})">You Reply</button>' +
                    '</ng-form>' +
                   '</section>',
        /*  Angular Note: in case you aren't very familiar with Angular, {{squareBrackets}} are placeholder values that can be set and manipulated through Angular.
            This mechanism of Angular allows me to do pretty much every part of creating the proper comment element.
        */
        /*  I kept the template in the directive rather than sending it out to a templateURL partial because it was small, and I felt including.
            Normally, I would consider this a serious sin. I have always said that HTML needs to be in HTML, JS in JS, CSS in CSS. 
            However, angular is an integral part of the HTML snippet. I view the primary rationale of splitting up functional areas because it allows someone working in one area to 
            easily understand and modify their portion of the application. With this directive, that isn't possible. 
        */
        /* Function Explanation: the link function 
            The link function is a basic part of many directives. It's distinct from it's counterpart 'compile' because the template is generated before link sets to work. Compile operates
            before the template is generated. 
            This link function operates by first choosing between three different comment types: a brian comment, a reply, or the first comment that is generated on page load (the default case).
            When the function determines what comment type it needs to prepare, it then selects an image at random. 
            Once the function knows the image it will use, it sets the proper CSS classes so the image will look appropriate. 
            With those three functions complete it is ready to be compiled and added to the DOM.
        */
        link: function ($scope) {
            var brians = ['After_Work', 'Smug', 'Napoleon', 'Halo', 'Sideburns', 'Squint', 'Roman', 'Charming'],
                replies = ['HungryPanda', 'DJOctopus', 'HappyLizard', 'SadKangaroo', 'PunkDuck', 'ShockedFrog', 'HighbrowHawk', 'GoofyJaguar'];
            switch ($scope.reqType) {
            case "brian":
                $scope.image = brians[$scope.getRandom()];
                var brianIndex = brians.indexOf($scope.image);
                if (brianIndex <= 3) {
                    $scope.picOrientation = 'leftOrientation';
                    $scope.textOrientation = 'leftBubble';
                } else {
                    $scope.picOrientation = 'rightOrientation';
                    $scope.textOrientation = 'rightBubble';
                }
                break;
            case "reply":
                $scope.image = replies[$scope.getRandom()];
                var replyIndex = replies.indexOf($scope.image);
                if (replyIndex <= 3) {
                    $scope.picOrientation = 'leftOrientation replyPic';
                    $scope.textOrientation = 'leftBubble';
                } else {
                    $scope.picOrientation = 'rightOrientation replyPic';
                    $scope.textOrientation = 'rightBubble';
                }
                break;
            default:
                $scope.image = 'After_Work';
                $scope.picOrientation = 'leftOrientation';
                $scope.textOrientation = 'leftBubble';
                break;
            }
        }
    };
});