/* A list of keywords that are used in Verilog. */
let keywords = [
  "endmodule",
  "module",
  "input",
  "output",
  "wire",
  "reg",
  "parameter",
  "assign",
  "posedge",
  "negedge",
  "begin",
  "end",
  "or",
  "and",
  "if",
  "else",
  "case:",
  "default:",
  "endcase",
  "`include",
  "`define",
  "`ifdef",
  "`endif",
];

/* A list of words that are important in Verilog. */
let importants = ["always", "always@", "always", "@"];

/* A list of punctuations that are used in Verilog. */
let punctuations = ["\\(", "\\)", "\\[", "\\]", "\\,", "\\."];

/* A list of operators that are used in Verilog. */
let operators = [
  "&lt;=",
  "&amp;",
  "\\|",
  "&quot;",
  "\\+",
  "-",
  "!",
  "\\*",
  "&lt;&lt;",
  "&gt;&gt;",
  "\\~",
];

/* Selecting all the elements with the class "verilog". */
let code_examples = document.querySelectorAll(".verilog");

code_examples.forEach(function (code_ex) {
  code = code_ex.innerHTML;

  /* Counting the number of lines in the code. */
  let newlineCount = code.split(/\r\n|\r|\n/).length;

  /* Replacing the semicolon with a span tag. */
  {
    /* A regex that matches a semicolon that is not preceded by an HTML entity. */
    const regex = new RegExp("(?<!&lt|&gt|&amp|&quot);", "g");
    code = code.replace(regex, `<span class="token punctuation">;</span>`);
  }

  /* Replacing the punctuation with a span tag. */
  for (let punctuation of punctuations) {
    const regex = new RegExp(punctuation, "g");
    code = code.replace(
      regex,
      `<span class="token punctuation">${punctuation}</span>`.replace("\\", "")
    );
  }

  /* Replacing the operators with a span tag. */
  for (let operator of operators) {
    const regex = new RegExp(operator, "g");
    code = code.replace(
      regex,
      `<span class="token operator">${operator}</span>`.replace("\\", "")
    );
  }

  /* Replacing the numbers with a span tag. */
  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(`${i}`, "g");
    code = code.replace(regex, `<span class="token number">${i}</span>`);
  }

  /* Replacing the keywords with a span tag. */
  for (let keyword of keywords) {
    const regex = new RegExp("[\\n\\s]" + keyword + "[\\n\\s]", "g");
    let foundKeywords = regex.exec(code);
    if (foundKeywords) {
      for (let foundKeyword of foundKeywords) {
        code = code.replace(regex, `<span class="token keyword">${foundKeyword}</span>`);
      }
    }
  }

  /* Replacing the important words with a span tag. */
  for (let important of importants) {
    const regex = new RegExp(important, "g");
    code = code.replace(
      regex,
      `<span class="token important">${important}</span>`
    );
  }

/* Adding the line numbers to the code. */
  {
    let linenumberTag = `<span class="line-numbers-rows" aria-hidden="true">`;
    for (let i = 0; i < newlineCount; i++) {
      linenumberTag += "<span></span>";
    }
    linenumberTag += "</span>\n</code>";
    const regex = new RegExp(`</code>`, "g");
    code = code.replace(
      regex,
      linenumberTag
    );
  }

  /* Replacing the code in the HTML file with the code that has been highlighted. */
  code_ex.innerHTML = code;
});
