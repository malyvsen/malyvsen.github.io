# title: malyvsen
# author: Nicholas Bochenski
# theme: dark

INCLUDE game_design.ink


-(init)
->home


==home
-(intro)
You enter a poorly lit website in the far corner of the Internet. The text you're reading claims you have found yourself on Nicholas Bochenski's personal webpage.
How can I help you?

* What do you do?
    ->game_design
* I was expecting [a normal website.]something more... conventional.
    I don't blame you. Have a look at <a href="https:\/\/www.linkedin.com/in/malyvsen/">my LinkedIn</a>, it'll hopefully answer all your questions.
-
->END