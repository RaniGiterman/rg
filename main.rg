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