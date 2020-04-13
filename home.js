var storyContent = ﻿{"inkVersion":18,"root":[[{"#":"title: malyvsen"},{"#":"author: Nicholas Bochenski"},{"#":"theme: dark"},"\n",[{"->":"home"},["done",{"#f":7,"#n":"g-0"}],{"#f":7,"#n":"init"}],null],"done",{"home":[[["^You enter a poorly lit website in the far corner of the Internet. The text you're reading claims you have found yourself on Nicholas Bochenski's personal webpage.","\n","^How can I help you?","\n",["ev",{"^->":"home.0.intro.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^What do you do?",{"->":"$r","var":true},null]}],["ev",{"^->":"home.0.intro.5.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","str","^a normal website.","/str","/ev",{"*":".^.^.c-1","flg":22},{"s":["^I was expecting ",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"home.0.intro.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n",{"->":"game_design"},{"->":"home.0.g-0"},{"#f":7}],"c-1":["ev",{"^->":"home.0.intro.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.5.s"},[{"#n":"$r2"}],"^something more... conventional.","\n","^I don't blame you. Have a look at <a href=\"https://www.linkedin.com/in/malyvsen/\">my LinkedIn</a>, it'll hopefully answer all your questions.","\n",{"->":"home.0.g-0"},{"#f":7}],"#f":7,"#n":"intro"}],{"g-0":["end",{"#f":7}]}],{"#f":3}],"game_design":[["^I design video games! My favorite things are writing (on Wednesdays) and mechanics (on all other days). I also program AI in my free time.","\n",[["ev",{"^->":"game_design.0.area_choice.0.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^What games did you make?",{"->":"$r","var":true},null]}],["ev",{"^->":"game_design.0.area_choice.1.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-1","flg":19},{"s":["^Did you make games before Frostpunk?",{"->":"$r","var":true},null]}],["ev",{"^->":"game_design.0.area_choice.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-2","flg":19},{"s":["^Tell me more about Playerless.",{"->":"$r","var":true},null]}],["ev",{"^->":"game_design.0.area_choice.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":".^.^.c-0"},"/ev",{"*":".^.^.c-3","flg":19},{"s":["^Tell me more about Frostpunk.",{"->":"$r","var":true},null]}],["ev",{"^->":"game_design.0.area_choice.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-4","flg":18},{"s":["^What's your favorite game?",{"->":"$r","var":true},null]}],["ev",{"^->":"game_design.0.area_choice.5.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-5","flg":18},{"s":["^What are your skills?",{"->":"$r","var":true},null]}],{"*":".^.c-6","flg":24},{"c-0":["ev",{"^->":"game_design.0.area_choice.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.0.s"},[{"#n":"$r2"}],"\n","^For two years, I was the lead designer on <a href=\"https://store.steampowered.com/app/711610/Playerless_One_Button_Adventure/\" target=\"_blank\">Playerless</a>, a small adventure made by a 20-people studio. Before that, I interned in the design team of <a href=\"https://store.steampowered.com/app/323190/\" target=\"_blank\">Frostpunk</a>, a critically acclaimed city-builder with a message.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-1":["ev",{"^->":"game_design.0.area_choice.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.1.s"},[{"#n":"$r2"}],"\n","^Yes! I led a group of hobbyists, <a href=\"http://ludumdare.com/compo/author/deltanegative/\" target=\"_blank\">Delta Negative</a>. I was responsible for a bit of everything: design, programming, and management, so it taught me a lot. Our biggest success was <a href=\"https://www.youtube.com/watch?v=iC5ovLl1WHc&feature=youtu.be\" target=\"_blank\">qb</a>, a mobile geometry puzzler - it won the Talent Show at <a href=\"http://digitaldragons.pl/\" target=\"_blank\">Digital Dragons</a> in 2017.","\n","^Even before that, I did some programming and design for <a href=\"https://www.youtube.com/user/Gnomescroll\" target=\"_blank\">Gnomescroll</a> and <a href=\"http://www.paramancer.com/\" target=\"_blank\">Paramancer</a>.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-2":["ev",{"^->":"game_design.0.area_choice.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","^I joined <a href=\"https://moonlit.games/\" target=\"_blank\">Moonlit Games</a> two weeks before <a href=\"https://www.gamearena.pl/en/\" target=\"_blank\">PGA</a>, Poland's largest video game fair - and a few weeks <i>after</i> the main designer/programmer of Playerless quit their job. I managed to get the game to a playable state just in time, and soon after I was put in charge of the game's design and programming. I lay the ground for the game's code (written in C#, as the game was built in Unity), and then focused on the creative functions like writing and designing puzzles.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-3":["ev",{"^->":"game_design.0.area_choice.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","^The game is a city-builder, but my main focus was the story - I designed, wrote and prototyped the unintended consequences of choices. For example, cannibalism helps avoid starvation - but also leads to dramatic scenes at the graveyard, of which I am the author. Frostpunk was made by a team of 80 people at <a href=\"http://www.11bitstudios.com/\" target=\"_blank\">11 Bit Studios</a>, so I gathered a lot of experience in cooperating with multiple stakeholders.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-4":["ev",{"^->":"game_design.0.area_choice.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n","^Glad you asked! It's Factorio - I generally love games with intrinsic motivation (that's true in real life, too - I have a lot of enthusiasm for interesting work). What's so good about specifically Factorio, though, is that it doesn't let me be a perfectionist: there's always a biter attack coming up, so I can't make things too perfect and need to manage my time well. It doesn't let me optimize the fun out of the game.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-5":["ev",{"^->":"game_design.0.area_choice.c-5.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.5.s"},[{"#n":"$r2"}],"\n","^Other than mechanics design and writing, I'm also good at programming (all those Unity projects taught me something!) and mathematics (mostly statistics and probability, because of the AI - but I've used these skills quite a bit for game design). Have a look at <a href=\"https://docs.google.com/document/d/1kt5MLiH5XIdUat9GKMjt_R4jGNwCVkmQKItXmDfiTuw/edit?usp=sharing\" target=\"_blank\">my resume</a> to see the full list.","\n",{"->":".^.^.^.g-0"},{"#f":7}],"c-6":["\n","^Oof, that's about as much as I can pour out in this online session. <a href=\"mailto:iceflamecode@gmail.com\">Contact me</a> if you want to chat more!","\n",{"->":".^.^.^.g-0"},{"#f":7}],"#f":7,"#n":"area_choice"}],{"g-0":[{"->":".^.^.area_choice"},{"#f":7}]}],{"#f":3}],"#f":3}],"listDefs":{}};