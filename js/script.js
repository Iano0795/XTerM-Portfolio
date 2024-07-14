class DotAnimation {
  constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.dots = [];
      this.dotCount = 100;
      this.maxDistance = 100;
      this.initCanvas();
      this.generateDots();
      this.animate();
  }

  initCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  }

  generateDots() {
      for (let i = 0; i < this.dotCount; i++) {
          this.dots.push({
              x: Math.random() * this.canvas.width,
              y: Math.random() * this.canvas.height,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2
          });
      }
  }

  animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#00fff2'; // Bright green dots

      this.dots.forEach(dot => {
          // Move the dot
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Bounce off the edges
          if (dot.x < 0 || dot.x > this.canvas.width) dot.vx *= -1;
          if (dot.y < 0 || dot.y > this.canvas.height) dot.vy *= -1;

          // Draw the dot
          this.ctx.beginPath();
          this.ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
          this.ctx.fill();

          // Draw lines to nearby dots
          this.dots.forEach(otherDot => {
              const dx = dot.x - otherDot.x;
              const dy = dot.y - otherDot.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < this.maxDistance) {
                  this.ctx.strokeStyle = `rgba(0, 0, 255, ${1 - distance / this.maxDistance})`; // Bright green lines
                  this.ctx.beginPath();
                  this.ctx.moveTo(dot.x, dot.y);
                  this.ctx.lineTo(otherDot.x, otherDot.y);
                  this.ctx.stroke();
              }
          });
      });

      requestAnimationFrame(() => this.animate());
  }
}

class LoadingScreen {
  constructor() {
      this.loadingText = document.getElementById('loading_text');
      this.dots = 0;
      this.interval = null;
  }

  startLoading() {
      this.interval = setInterval(() => this.animateLoading(), 300);
  }

  animateLoading() {
      if (this.dots < 10) {
          this.dots++;
      } else {
          this.dots = 0;
      }
      this.loadingText.innerHTML = 'Booting Portfolio' + '.'.repeat(this.dots);
  }

  stopLoading() {
      clearInterval(this.interval);
      document.getElementById('loading_screen').style.display = 'none';
      document.getElementById('desktop_screen').style.display = 'block';
      document.body.classList.remove('loading');
      const dotAnimation = new DotAnimation('canvas');
      document.getElementById('canvas').classList.add('show');
      dotAnimation.animate();
  }
}

class Terminal {
  constructor(elementId, commands) {
      this.element = document.getElementById(elementId);
      this.commands = commands;
      this.commandIndex = 0;
      this.charIndex = 0;
  }

  startTyping() {
      this.type();
  }

  type() {
      const currentCommand = this.commands[this.commandIndex];
      const commandLineDiv = document.createElement('div');
      commandLineDiv.classList.add('command-line');
      commandLineDiv.innerHTML = `<span class="user">(<p>ian_kipkorir_@p3nt3st3r</p>)</span><span class="path">- [<p>~/</p>]</span>`;
      const typingContainerDiv = document.createElement('div');
      typingContainerDiv.classList.add('typing_container');
      typingContainerDiv.innerHTML = `<span class="dollar">$&nbsp;</span><span id="typed-text-${this.commandIndex}" class="typed-text"></span><span id="cursor-${this.commandIndex}" class="cursor"></span>`;
      const outputDiv = document.createElement('div');
      outputDiv.classList.add('output', 'hidden');
      if (currentCommand.type === 'directory') {
          outputDiv.classList.add('directory');
      }
      outputDiv.id = `output-${this.commandIndex}`;

      this.element.appendChild(commandLineDiv);
      this.element.appendChild(typingContainerDiv);
      this.element.appendChild(outputDiv);

      this.typeCharacter(currentCommand, typingContainerDiv.querySelector(`#typed-text-${this.commandIndex}`), typingContainerDiv.querySelector(`#cursor-${this.commandIndex}`));
  }

  typeCharacter(currentCommand, typedTextSpan, cursorSpan) {
      if (this.charIndex < currentCommand.command.length) {
          typedTextSpan.textContent += currentCommand.command.charAt(this.charIndex);
          this.charIndex++;
          setTimeout(() => this.typeCharacter(currentCommand, typedTextSpan, cursorSpan), 400); // Typing speed (milliseconds)
      } else {
          cursorSpan.classList.remove('cursor'); // Stop cursor from blinking
          const outputElement = document.getElementById(`output-${this.commandIndex}`);
          outputElement.textContent = currentCommand.output;
          outputElement.classList.remove('hidden');

          // Show output after a short delay
          setTimeout(() => {
              this.commandIndex++;
              if (this.commandIndex < this.commands.length) {
                  // Prepare for next command
                  this.charIndex = 0;

                  // Start typing next command
                  this.type();
              }
          }, 3000); // Delay before typing next command (milliseconds)
      }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  const loadingScreen = new LoadingScreen();
  const terminalCommands = [
      { command: "whoami", output: "ian_kipkorir" }
  ];
  const openOpacityBringerElements = ['xterm', 'xterm_app', 'portfolio_window'];
  document.body.classList.add('loading');

  // Start loading screen animation
  loadingScreen.startLoading();

  // Show the loading screen for 5 seconds, then display the main content
  setTimeout(function() {
      loadingScreen.stopLoading();
  }, 5000);

  // Add event listeners for opening opacity bringer
  openOpacityBringerElements.forEach(function(id) {
      const element = document.getElementById(id);
      if (element) {
          element.addEventListener('click', function() {
              const opacityBringer = document.getElementById('opacity_bringer');
              opacityBringer.classList.add('show');
              // Reinitialize Terminal each time the div is opened
              const terminalDiv = document.getElementById('terminal');
              terminalDiv.innerHTML = ''; // Clear previous terminal content
              const terminal = new Terminal('terminal', terminalCommands);
              terminal.startTyping();
          });
      }
  });

  // Close the opacity bringer div
  const closeOpacityBringer = document.getElementById('close_button');
  closeOpacityBringer.addEventListener('click', function() {
      const opacityBringer = document.getElementById('opacity_bringer');
      opacityBringer.classList.remove('show');
      const terminalDiv = document.getElementById('terminal');
      terminalDiv.innerHTML = '';
  });

  // Internet status handler
  const internetStatusHandler = () => {
      const internetDiv = document.getElementById('internet');
      const onlineImage = "/assets/images/online.svg";
      const offlineImage = "/assets/images/offline.svg";

      internetDiv.innerHTML = `<img src="${navigator.onLine ? onlineImage : offlineImage}" alt="">`;
  };

  // Check internet status on load
  internetStatusHandler();

  // Add event listeners for online and offline events
  window.addEventListener('online', internetStatusHandler);
  window.addEventListener('offline', internetStatusHandler);

  // CPU animation
  const cpuAnimationDiv = document.getElementById('cpu_animation');
  const cpuAnimation = () => {
      cpuAnimationDiv.innerHTML = '';
      for (let i = 0; i < 4; i++) {
          const bar = document.createElement('div');
          bar.classList.add('cpu_bar');
          bar.style.height = `${Math.random() * 100}%`;
          bar.style.width = '10px';
          bar.style.backgroundColor = '#45c5f8';
          bar.style.display = 'inline-block';
          bar.style.margin = '0 1px';
          cpuAnimationDiv.appendChild(bar);
      }
  };

  setInterval(cpuAnimation, 1000);

  // Event listeners for navigation links
  const navLinks = {
      home_link: { elementId: 'home', commands: [{ command: "whoami", output: "ian_kipkorir" }] },
      about_link: { elementId: 'About', commands: [{ command: "cat about.txt", output: "About content goes here" }] },
      contact_link: { elementId: 'Contact', commands: [{ command: "cat contact.txt", output: "Contact content goes here" }] },
      projects_link: { elementId: 'Projects', commands: [{ command: "ls projects", output: "Projects content goes here" }] },
      skills_link: { elementId: 'Skills', commands: [{ command: "cat skills.txt", output: "Skills content goes here" }] }
  };

  for (const [linkId, config] of Object.entries(navLinks)) {
      const linkElement = document.getElementById(linkId);
      linkElement.addEventListener('click', () => {
          for (const section of Object.values(navLinks)) {
              document.getElementById(section.elementId).style.display = 'none';
          }
          document.getElementById(config.elementId).style.display = 'block';
          const terminalDiv = document.getElementById(`terminal_${config.elementId.toLowerCase()}`);
          terminalDiv.innerHTML = '';
          const terminal = new Terminal(`terminal_${config.elementId.toLowerCase()}`, config.commands);
          terminal.startTyping();
      });
  }
});
