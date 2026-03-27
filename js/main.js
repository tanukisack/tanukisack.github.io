//GPT MAIN

const texter = document.getElementById("texter");
const typer = document.getElementById("typer");
const output = document.getElementById("output");
const command = document.getElementById("command");

// Focus fix for mobile Safari
command.addEventListener("click", () => texter.focus());
command.addEventListener("touchstart", () => texter.focus(), { passive: true });

let history = [];
let historyIndex = 0;

texter.addEventListener("input", () => {
  typer.textContent = texter.value;
});

texter.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    runCommand(texter.value.trim());
    texter.value = "";
    typer.textContent = "";
  }

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      texter.value = history[historyIndex];
      typer.textContent = texter.value;
    }
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      texter.value = history[historyIndex];
      typer.textContent = texter.value;
    } else {
      texter.value = "";
      typer.textContent = "";
    }
  }
});

function runCommand(cmd) {
  if (!cmd) return;

  history.push(cmd);
  historyIndex = history.length;

  print(`> ${cmd}`);

  switch (cmd.toLowerCase()) {
    case "help":
      print("Available commands: help, about, clear, github");
      break;

    case "about":
      print("This is your terminal-style website.");
      break;

    case "clear":
      output.innerHTML = "";
      break;

    case "github":
      openLink("https://github.com/");
      break;

    default:
      print("Command not found");
  }
}

function print(text) {
  const p = document.createElement("p");
  p.textContent = text;
  output.appendChild(p);
  window.scrollTo(0, document.body.scrollHeight);
}

// Safari-safe link opening
function openLink(url) {
  const win = window.open(url, "_blank");
  if (!win) {
    window.location.href = url;
  }
}