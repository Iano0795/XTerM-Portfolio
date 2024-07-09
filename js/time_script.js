document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('start_menu');
    const timeElement = document.getElementById('time');
    const powerButton = document.getElementById('powerbutton');
    const startButton = document.getElementById('start_button');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    document.addEventListener('click', function(event) {
        if (event.target !== menu && !menu.contains(event.target) && event.target !== startButton) {
            menu.style.display = 'none';
        }
    });

    startButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the event from bubbling up to the document
        menu.style.display = 'flex';
    });

    powerButton.addEventListener('click', function() {
        // Power button functionality (if any)
    });

    // Initial call to display the time immediately
    updateTime();
    // Update the time every second
    setInterval(updateTime, 1000);
});
