import Article from "../Article";

export const perspective: Article = {
  title: "A perspective on how LLMs work",
  content: (
    <>
      <p>
        Most of my days are spent trying to extract every bit of smarts from
        LLMs, and it's usually incremental work: improve this here, simplify
        that there. What I live for, though, are fundamental truths (I wanted to
        be a scientist most of my life, until I got a taste of how
        energy-deprived academia is). So here's my shot: let me share my way of
        thinking about how LLMs work.
      </p>

      <p>
        <strong>
          When deciding which token comes next, an LLM's choice is constrained
          by grammar (implied by the last few tokens), and associations (implied
          by the general topic of the wider context).
        </strong>
      </p>

      <p>
        If this feels dangerously close to psychology, that's for a good reason.
        I don't mean this as a testable theory, it's more of a way of looking at
        the topic which I hope will prove useful. Let me explain how.
      </p>

      <p>
        I came up with this theory while wondering about two puzzles I have
        encountered in my work:
      </p>

      <ol>
        <li>
          Given all my experience with deep learning, LLMs seem to generalize{" "}
          <em>too</em> well: they don't just learn word patterns, they seem to
          actually acquire knowledge. They'll often make true statements which I
          have a hard time believing appeared verbatim in their training data.
        </li>
        <li>
          It seems impossible for an LLM to incrementally build a mental model
          of something: when they focus on one aspect of a topic, they disregard
          others. When you ask an LLM to help solve a problem, get a solution
          which won't work due to some extra circumstances, and provide these
          circumstances to narrow down the scope, the LLM will often
          successfully address the circumstances but fail to solve the original
          problem.
        </li>
      </ol>

      <p>My little theory provides an intuitive explanation for both:</p>

      <ol>
        <li>
          LLMs seem to acquire knowledge, but what they really acquire is a good
          feeling for associations. I once asked Phi, a model with "only" 2.7B
          parameters, whether one can drink gin a few years after the bottle has
          been opened. Phi didn't quite understand my question (it started
          talking about "gin" as if it were an establishment which had opened a
          few years before), but it did include words related to drinking - for
          one, the establishment, of all things, was a bar. I think that if you
          have a model which is good at producing grammatically correct
          sentences, and then narrow your choice of grammatically correct words
          down by connection to the current topic, you'll already get quite far
          in terms of seeming intelligent. This is the sort of pattern matching
          that deep learning excels at, and so I think this is what might be
          happening.
        </li>
        <li>
          If it seems impossible for an LLM to build a mental model of
          something, that's because it really can't: associations can only take
          you this far. At some point, you need an extra reasoning step to
          incorporate the extra information you've gathered, which an LLM - with
          its fixed amount of computation per output token - cannot perform.
        </li>
      </ol>

      <p>
        This would explain AI's Fermi paradox: if we can easily get an LLM to
        talk to itself and think out loud, why has AGI not arrived yet? Because
        you don't get any smarter by reading the dictionary twice.
      </p>
    </>
  ),
  hasFooter: true,
};
