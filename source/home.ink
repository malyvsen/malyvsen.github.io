# title: malyvsen
# author: Nicholas Bochenski
# theme: dark

INCLUDE game_design.ink
INCLUDE interesting.ink


-(init)
->home


==home
-(intro)
You enter a poorly lit website in the far corner of the Internet. Your gaze is attracted to a word you can't recognize (is it a word at all?) written in yellowish-orange Ink - probably the title. After a brief pause, you abandon attempts to understand it and proceed to read my words below.
* Who's talking to me?
    Oh, I'm terribly sorry. Nicholas Bochenski. I'm the architect over here. It's probably nice to meet you. I mean it <i>is</i>, but I wish I could tell better. What are you looking for?
* I was expecting[ a normal website.] something... more conventional.
    Don't worry, you'll find everything you're looking for. Which, by the way, is..?
* [\[Remain silent\]]
    I know you're there, you know. I gave you the option to remain silent. Do tell me, what are you looking for?

-(what_looking_for)
* Nicholas Bochenski, game designer?
    That's me! How can I help?
    ->game_design
* Something interesting.
    Coming up!
    ->interesting