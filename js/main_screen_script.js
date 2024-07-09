document.addEventListener('DOMContentLoaded', function() {
    const commands = [
        { command: "whoami", output: "ian_kipkorir" },
        { command: "ls", output: "About  Contact  Projects Skills", type: "directory" }
        // Add more commands and outputs as needed
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
                setTimeout(typeCharacter, 100); // Adjust typing speed here (milliseconds)
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
                }, 2000); // Delay before typing next command (milliseconds)
            }
        }

        typeCharacter();
    }

    type();
});
