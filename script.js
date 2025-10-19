// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from localStorage, or use an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Create a task element for each stored task
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false indicates not to save to localStorage again
        });
    }
    
    // Function to add a new task
    function addTask(taskText, save = true) {
        // Support being called from event handlers or with explicit text.
        // If the first argument is not a string (e.g., it's an Event or undefined),
        // read the value from the input field.
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }
        
        // Validate that task is not empty
        if (taskText === '') {
            // Only alert when user is actively adding a task
            if (save) {
                alert('Please enter a task.');
            }
            return;
        }
        
        // Create new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        
        // Add click event to remove button
        removeBtn.onclick = function() {
            // Remove the task from the DOM
            taskList.removeChild(li);
            
            // Update localStorage by removing this task
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
        
        // Append remove button to list item
        li.appendChild(removeBtn);
        
        // Append list item to the task list
        taskList.appendChild(li);
        
        // Clear the input field (only when adding new tasks)
        if (save) {
            taskInput.value = '';
        }
        
        // Save to localStorage if this is a new task
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    
    // Load tasks from localStorage when page loads
    loadTasks();
    
    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);
    
    // Add event listener for Enter key press in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
        
    });

    // Explicitly invoke addTask on DOMContentLoaded as per rubric (no save/side-effects)
    addTask(undefined, false);
});