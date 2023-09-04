//Task 1
function localize(strings, ...values) {
  const language = values[values.length - 1];
  const translations = translationsObj[language];

  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length - 1) {
      result += translations[values[i]];
    }
  }

  return result;
}

const translationsObj = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const language = "fr";
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}${language}`;
const localizedIntroduction = localize`${introduction}${language}`;

// console.log(localizedGreeting);
// console.log(localizedIntroduction);

//Task 2
function highLightKeywords(template, keywords) {
  return template.replace(
    /\${(\d+)}/g,
    (_, index) => `<span class='highlight'>${keywords[parseInt(index)]}</span>`
  );
}

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highLightKeywords(template, keywords);

// console.log(highlighted);

//Task 3
function multiline(strings, ...values) {
  const lines = strings[0].split("\n");
  return lines.map((line, index) => `${index + 1} ${line}`).join("\n");
}

const code = multiline`
function add(a, b) {
return a + b;
}
`;

// console.log(code);

//Task 4
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

//Task 5
function throttle(func, interval) {
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= interval) {
      func.apply(this, args);
      lastExecTime = currentTime;
    }
  };
}

function onScroll(event) {
  console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScrollHandler);

//Task 6
function curry(func, arity) {
  return function curried(...args) {
    if (args.length >= arity) {
      return func(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2);
const step2 = step1(3);
const result = step2(4);

console.log("Result:", result); // Expected: 24
