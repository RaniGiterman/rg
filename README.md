<h1>
 📘 About the package 📘
</h1>
This is the official interpreter for the rg language.
Happy coding!

<h1>
 💙 Get started 💙
</h1>

After installing, create a `.env` file, and specify the path to your .rg file.
Your `.env` file should have something similiar to:
`FILE=./main.rg`
<br>

Now let's code some RG!
Here's an implementation of the classic fizzbuzz coding problem in rg:

```js
i = 1

@for $i <= 100; i = $i + 1
   state = ""

   @if $i % 3 == 0 && $i % 5 == 0
       print("FizzBuzz")
       state = "yes"
   @fi

   @if $i % 3 == 0 && !$state
       print("Fizz")
       state = "yes"
   @fi

   @if $i % 5 == 0 && !$state
       print("Buzz")
       state = "yes"
   @fi

   @if !$state
       print($i)
   @fi
@rof
```

To get the value of a variable, write a dollar sign ($), then the name of the variable.

To run the file, run the following from the root of your project: `node node_modules/argee/interpreter.js`

<h1> 
 RG VISION
</h1>

There is no such thing as nested for loops, nor nested ifs.
There is no such thing as else or else-ifs, as rg encourages you to confidently state all possible conditions.
If you do write them, you will most likely receive an unexpected result, if not a compile error.

rg inspires to be yet another language you can add to your arsenal of skills and programming languages, then forget about it and move on in life.
rg is an extremely simple programming language, that complies to JS code.

<h1>

💎 Installation 💎

</h1>

```
$ npm i argee
```
