import Article from "../Article";

export const researchCode: Article = {
  title: "Research code",
  content: (
    <>
      <p>
        …always sucks. It’s a synonym for “illegible, overcomplicated, and
        fragile”, as anyone who’s worked in machine learning will tell you -
        then, after remembering that “pragmatic” was one of the keywords in
        their job description: “it has to be this way if you go fast”. I
        disagree. If you want to go fast, you don’t want other people’s code to
        slow you down. You can usually live with your own bad code, though, at
        least for a while - and this, I think, is key to the solution.
      </p>
      <p>
        My dream of becoming a game developer came true when I was 13 and asked
        the creators of a Minecraft-in-space called{" "}
        <a href="https://github.com/Gnomescroll/Gnomescroll">Gnomescroll</a> if
        I could code too. It was in C++, we used Mercurial and ran a single
        server hosting a 512x512 block world that all players would join. I
        spent a month writing code which would procedurally generate alien
        cities. My work was mostly experimental: I wrote formula after formula
        and launched the game to see how credible the generated structures
        looked. So, when I accidentally deleted all my work with the wrong
        Mercurial command (ah, the delights of using version control when you
        only recently understood what a function is), I re-created the code in a
        few days - and it was <em>so much cleaner</em>. I would have had a great
        time developing it further, had I not decided it was time to work on
        meteor strikes.
      </p>
      <p>
        I accidentally did what I now do on purpose: I split my work into an
        experimental stage, when I quickly write messy code not meant to end up
        on <code>main</code>, and an implementation stage, when I draw
        conclusions on what worked and only implement that (but in a simple,
        clean manner). This way, I can experiment fast without slowing down
        future research, my own or that of others. Very demure, very mindful.
      </p>
    </>
  ),
  hasFooter: true,
};
