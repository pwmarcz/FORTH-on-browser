==================
 FORTH on browser
==================

.. demo


HISTORY
=======

- Milestome1: simple stack-based execution

  - the user will be able to input the words in the interpreter to execute them
  - the webpage will show the current state of the stack (as a list on the right side of the terminal)
  - simple words: numbers, arithmetic (+,-,*,/), stack manipulation (dup, drop, swap etc.), printing the result (.)
  - (no procedures yet)
  - "1 2 +" returns "3"

- Milestone2: procedures
  - (: double 2 * ;)
  - "compilation mode / run mode" distinction
  - virtual machine: the target code will consist not of words, but of operations: call(word), push(number)
  - compile and run mode: the words will get executed in run mode, and transformed to the target code in compile mode
  - immediate words: some words will get executed in compile mode
  - ':' word will enter compile mode, compile words until ';' (a definition), and create a new word
  - comments ('(' word)

    - '(' will read input until ')' and disregard it

  - source textbox, as with other interpreters
  - factorial demonstration

    - boolean type and literals (true, false), logic operations (and, or, not)
    - number comparison (=, < etc.),
    - conditionals (if..then, if..else..then), loops (repeat..until)
    - virtual machine will get branching instructions: goto(number), goto-if-false(number)
    - 'if' will be an immediate word that reads words until 'else' and 'then', and adds appropriate branching instruction
    - the same for 'repeat..until'

::

   : fact
     dup 0 = if
       drop 1
     else
       dup 1 - fact
       *
     then
   ;

- Milestone3: variable and debugger

  - variables (variable x), storing and fetching them (x @, x !)
  - other Forth loop constructs (including do..loop with a loop index)

    - original Forth used raw pointers (running 'x' puts 123823 on the stack), we can do something nicer (running 'x' will put <x> on the stack).

  - debugger:

    - show execution state with call stack and all the words, [step into] and [step over] buttons
    - being able to display and step over execution (this is probably a big one)


License
=======

GPLv3 (c) NISHIO Hirokazu 2012


Thanks
======

Paweł Marczewski contributed much to the project.
