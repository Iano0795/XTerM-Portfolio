document.addEventListener('DOMContentLoaded', function() {
    const openOpacityBringerElements = ['xterm', 'xterm_app', 'portfolio_window'];
    document.body.classList.add('loading');
    // Loading screen animation
    const loadingText = document.getElementById('loading_text');
    let dots = 0;
  
    function animateLoading() {
      if (dots < 10) {
        dots++;
      } else {
        dots = 0;
      }
      loadingText.innerHTML = 'Booting Portfolio' + '.'.repeat(dots);
    }
  
    const loadingInterval = setInterval(animateLoading, 300);
  
    // Show the loading screen for 2 seconds, then display the main content
    setTimeout(function() {
      clearInterval(loadingInterval);
      document.getElementById('loading_screen').style.display = 'none';
      document.getElementById('desktop_screen').style.display = 'block';
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 5000);
    openOpacityBringerElements.forEach(function(id) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', function() {
                    // Show the opacity_bringer div
                    const opacityBringer = document.getElementById('opacity_bringer');
                    opacityBringer.classList.add('show');
                    const commands = [
                        { command: "whoami", output: "ian_kipkorir" }
                    ];
                
                    let commandIndex = 0;
                    let charIndex = 0;
                    const terminalDiv = document.getElementById('terminal');
                
                    function type() {
                        const currentCommand = commands[commandIndex];
                        const commandLineDiv = document.createElement('div');
                        commandLineDiv.classList.add('command-line');
                        commandLineDiv.innerHTML = `<span class="user">(<p>ian_kipkorir_@p3nt3st3r</p>)</span><span class="path">- [<p>~/</p>]</span>`;
                        const typingContainerDiv = document.createElement('div');
                        typingContainerDiv.classList.add('typing_container');
                        typingContainerDiv.innerHTML = `<span class="dollar">$&nbsp;</span><span id="typed-text-${commandIndex}" class="typed-text"></span><span id="cursor-${commandIndex}" class="cursor"></span>`;
                        const outputDiv = document.createElement('div');
                        outputDiv.classList.add('output', 'hidden');
                        if (currentCommand.type === 'directory') {
                        outputDiv.classList.add('directory');
                        }
                        outputDiv.id = `output-${commandIndex}`;
                
                        terminalDiv.appendChild(commandLineDiv);
                        terminalDiv.appendChild(typingContainerDiv);
                        terminalDiv.appendChild(outputDiv);
                
                        const typedTextSpan = document.getElementById(`typed-text-${commandIndex}`);
                        const cursorSpan = document.getElementById(`cursor-${commandIndex}`);
                
                        function typeCharacter() {
                        if (charIndex < currentCommand.command.length) {
                            typedTextSpan.textContent += currentCommand.command.charAt(charIndex);
                            charIndex++;
                            setTimeout(typeCharacter, 400); // Typing speed (milliseconds)
                        } else {
                            cursorSpan.classList.remove('cursor'); // Stop cursor from blinking
                            const outputElement = document.getElementById(`output-${commandIndex}`);
                            outputElement.textContent = currentCommand.output;
                            outputElement.classList.remove('hidden');
                
                            // Show output after a short delay
                            setTimeout(function() {
                            commandIndex++;
                            if (commandIndex < commands.length) {
                                // Prepare for next command
                                charIndex = 0;
                
                                // Start typing next command
                                type();
                            }
                            }, 3000); // Delay before typing next command (milliseconds)
                        }
                        }
                
                        typeCharacter();
                    }
                
                    type(); 
            });
        }
    });

    // Close the opacity_bringer div
    const closeOpacityBringer = document.getElementById('close_button');
    closeOpacityBringer.addEventListener('click', function() {
      const opacityBringer = document.getElementById('opacity_bringer');
      opacityBringer.classList.remove('show');
      const terminalDiv = document.getElementById('terminal');
      terminalDiv.innerHTML = '';
    });
  });
  