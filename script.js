// =============================================
//  TERMINAL - Interactive Commands
// =============================================

const output = document.getElementById('term-output');
const input  = document.getElementById('term-cmd');


// ---- adding more commands later ----
const commands = {

  help: () => [
    { t: 'out', v: 'Available commands:' },
    { t: 'out', v: '  whoami       — who is this guy' },
    { t: 'out', v: '  docker ps    — running containers' },
    { t: 'out', v: '  skills       — technical skills' },
    { t: 'out', v: '  education    — where I study' },
    { t: 'out', v: '  contact      — get in touch' },
    { t: 'out', v: '  clear        — clear the terminal' },
  ],

  whoami: () => [
    { t: 'out', v: 'Andrew Hirst' },
    { t: 'out', v: 'Software Engineering student @ Edge Hill University' },
    { t: 'out', v: 'Passionate about hardware, Linux & cybersecurity' },
    { t: 'out', v: 'Based in Ormskirk, Lancashire, UK' },
  ],

  'docker ps': () => [
    { t: 'out', v: 'CONTAINER ID   IMAGE         STATUS' },
    { t: 'out', v: 'a1b2c3d4e5f6   jellyfin      Up 3 days' },
    { t: 'out', v: 'b2c3d4e5f6a1   gameserver    Up 1 day' },
    { t: 'out', v: 'c3d4e5f6a1b2   portainer     Up 3 days' },
  ],

  skills: () => [
    { t: 'out', v: 'Languages:   HTML, CSS, JavaScript' },
    { t: 'out', v: 'Systems:     Ubuntu Server, Kali Linux' },
    { t: 'out', v: 'Tools:       Docker, Git, MySQL, SSH' },
    { t: 'out', v: 'Other:       PC hardware, Networking' },
  ],

  education: () => [
    { t: 'out', v: 'Degree:      BSc Software Engineering' },
    { t: 'out', v: 'University:  Edge Hill University' },
    { t: 'out', v: 'Year:        2nd year (in progress)' },
  ],

  contact: () => [
    { t: 'out', v: 'Email:     ajhirst04@gmail.com' },
    { t: 'out', v: 'GitHub:    github.com/Ajhrst' },
    { t: 'out', v: 'LinkedIn:  linkedin.com/in/andrew-hirst-50b151275' },
  ],

  clear: () => {
    output.innerHTML = '';
    return [];
  },

  // Easter eggs
  sudo:  () => [{ t: 'err', v: "Nice try pal" }],
  ls:    () => [{ t: 'out', v: 'homelab/   portfolio/   skills.txt   contact.txt' }],
  pwd:   () => [{ t: 'out', v: '/home/andrew' }],
  uname: () => [{ t: 'out', v: 'Linux ubuntu-server 6.5.0 #1 SMP x86_64 GNU/Linux' }],

};
// ---- end ----


// Prints a single line to the terminal
function printLine(text, type) {
  const div = document.createElement('div');
  div.className = type === 'err' ? 'term-err' : 'term-out';
  div.textContent = text;
  output.appendChild(div);
}

// Runs when the user presses Enter
function run(cmd) {
  const trimmed = cmd.trim().toLowerCase();

  // Print what the user typed
  const promptDiv = document.createElement('div');
  promptDiv.className = 'term-line';
  promptDiv.innerHTML = '<span class="term-prompt">andrew@ubuntu-server:~$</span><span class="term-cmd-text">' + cmd + '</span>';
  output.appendChild(promptDiv);

  if (!trimmed) {
    output.scrollTop = output.scrollHeight;
    return;
  }

  // Look up the command and run it
  const handler = commands[trimmed];
  if (handler) {
    const lines = handler();
    lines.forEach(function(l) { printLine(l.v, l.t); });
  } else {
    printLine("command not found: " + trimmed + ". Try 'help'", 'err');
  }

  output.scrollTop = output.scrollHeight;
}

// Listen for Enter key
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    run(input.value);
    input.value = '';
  }
});

// Click anywhere on the terminal to focus the input
document.querySelector('.terminal-interactive').addEventListener('click', function() {
  input.focus();
});
