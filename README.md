Brian Says
You can find the application at: http://briansays.herokuapp.com/
=================
Where to Find Detailed Comments by Topic

1. Javascript - app/scripts/app.js
2. CSS - app/styles/main.scss
3. HTML - app/views/index.html

=================
Overview

1. Inspiration for this Application:
In a few interviews I have been asked to describe my development process. In response, I fumbled sort of vaguely through an explanation, but I thought it would be far more meaningful to answer those sorts of questions with a mini-application. 
2. Primary Tools:
Brian Says is built with a partial MEAN stack (Mongo database, Express node framework, Angular.js front-end framework, Node.js server-side javascript).
It didn't need a database backend so Mongo is not part of this application. Node is also a very thin layer, most of this application's logic is client-side Angular.
3. Support Tools:
Yeoman - I scaffolded this project with a yeoman geneator, and kept many of the file architecture decisions of the generator. That is also why the favico is some guy with a moustache and a funny hat.
SASS - is my preprocessor of choice, and I used it while creating this application.
Chrome Dev Tools / Responsinator (third party site) / LiveReload (Chrome plugin) / Window Resizer (Chrome plugin).
4. Warning: 
At the moment, I haven't optimized this application for anything other than modern browsers. I will likely expand it's browser coverage in the future. Briansays makes liberal use of advanced CSS3 features, so it won't survive older browsers without a number of fallbacks.
5. Design / UX Philosophy:
-I wanted briansays to be actually fun to use. My fun enhancing strategies were:
    i) I felt this application worked best as a private application so users could use it in an uninhibited way. So user sessions are not exposed over the internet. 
    ii) I also added a heavy element of randomness throughout the application so users can feel a bit like they are conversing with the application. There are sixteen total images and eight default text responses.
    iii) As always, I picked out a custom font. The specific font I picked looked handwritten and a bit goofy.
-Fun wasn't my only goal. I make everything I build as simple as I can. Thus, I used a minimum of text and very short user prompts. Everyone on the internet is traveling a mile a minute, UX needs to reflect that reality.
-In terms of design, briansays is much more plain than my typical designs. I normally use bright and vibrant color schemes.
However, that would be difficult to integrate with the images. The brian images all have different different color palletes and JPEG image are not as heavy as the transparent PNGs, which I would have to use if I wanted to use them in a more colorful design. I decided it was best to keep it simple in this case.
-If I were to add features to briansays, I would add the ability to share a session with another, invited user and chat in realtime. Very easy to do with Node. Might be overkill for what is supposed to be a tiny project.
