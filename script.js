// STEP 1: Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // STEP 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // STEP 3: Create the addTask function
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();
        
        // Check if empty
        if (taskText === '') {
            alert('Please enter a task.');
            return; // Stop here if empty
        }
        
        // STEP 4: Create task elements
        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        // STEP 5: Add remove functionality
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };
        
        // STEP 6: Append elements
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        
        // Clear input field
        taskInput.value = '';
    }
    
    // STEP 7: Attach event listeners
    // Listen for button click
    addButton.addEventListener('click', addTask);
    
    // Listen for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});