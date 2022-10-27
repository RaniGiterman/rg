const fs = require("fs");
require('dotenv').config()


const vars = {};

let inside_if;
let allowed_if;
let in_for_loop;
let arr_for_loop = [];
let condition_with_vars;
let increaser;

function main() {
  let file_content = read_from_file(process.env.FILE); // file path will and should not be constant
  if (file_content.err) return console.error(file_content.err);
  interpreter(file_content.reply.split("\n"))
}

function interpreter(lines, done_for_loop) {
  for (let line of lines) {
    line = remove_whitespace(line);
    // console.log(line, inside_if, allowed_if, "INTERPeter")


    if (in_for_loop && !done_for_loop) arr_for_loop.push(line);
    if (line == "end") return;
    if (line[0] + line[1] + line[2] == "@fi") {
      // if (!allowed_if) continue
      inside_if = false;
    }

    if (inside_if) {
      if (!allowed_if) {
        continue; // inside an if statement, but not allowed to execute code inside.
      }
    }

    if (line.includes("#")) continue; // comment

    else if (line.slice(0, 4) == "@for") {
      let loop_info = line.slice(4)

      // arr[0] is the condition
      // arr[1] is the "increaser"
      let arr = loop_info.split(";")
      increaser = arr[1]
      condition_with_vars = arr[0]

      loop_info = replace_vars(loop_info)
      arr = loop_info.split(";")

      let condition
      try {
        condition = eval(arr[0])
      } catch (error) {
        console.error(error)
      }

      // update_var(arr[1])

      if (condition) in_for_loop = true
    } else if (line.slice(0, 4) == "@rof") {
      let temp = replace_vars(increaser)
      update_var(temp)
      // if
      let condition = replace_vars(condition_with_vars)

      try {
        condition = eval(condition)
      } catch (error) {
        return console.error(error)
      }


      if (condition)
        interpreter(arr_for_loop, true)
    }
    else if (line[0] + line[1] + line[2] == "@if") {
      // if statement
      // line[3] will always be a space
      // so line[4] until the last index before the end of the line is the condition

      let condition = line.slice(3);
      condition = replace_vars(condition);

      try {
        condition = eval(condition);
      } catch (error) {
        return console.error(error);
      }

      inside_if = true;
      if (condition) {
        allowed_if = true;
      } else {
        allowed_if = false;
      }
    } else if (line.includes("=")) {
      update_var(line)
    } else if (line.includes("print")) {
      line = replace_vars(line);
      line = remove_whitespace(line);
      line = line.replaceAll(",", " ");

      if (line[5] != "(" || line[line.length - 1] != ")") {
        return console.error(
          `Syntax error: print is a function and needs to be called with sorrounding brackets: print().`
        );
      }

      console.log(line.slice(6, -1));
    }
  }

}

function update_var(line) {
  // declaration/update of variable
  // left-hand side is the variable name/key
  // right-hand side is the value of the variable

  let left = line.split("=")[0];
  let right = line.split("=")[1];

  right = replace_vars(right);

  try {
    right = eval(right);
  } catch (error) {
    return console.error(error);
  }

  vars[left] = right;
}

function read_from_file(file_path) {
  try {
    const data = fs.readFileSync(file_path, "utf8");
    return { reply: data, err: null };
  } catch (err) {
    return { reply: null, err: err };
  }
}

function remove_whitespace(str) {
  return str.replace(/\s+/g, "");
}

function replace_vars(str) {
  for (const [key, value] of Object.entries(vars)) {
    if (/^\d+$/.test(value))
      str = str.replaceAll("$" + key, value);
    else
      str = str.replaceAll("$" + key, '"' + value + '"');
  }

  return str;
}

main();
