let exercises = [];

function addExercise() {
  const name = document.getElementById('exercise-name').value;
  const type = document.getElementById('exercise-type').value;

  // Create a new exercise object
  const exercise = { name, type, repetitions: [] };
  exercises.push(exercise);

  // Clear the input field
  document.getElementById('exercise-name').value = '';

  // Update the UI
  updateExercisesUI();
}

function addRepetition(exerciseIndex) {
  // Define the prompt message based on the type of exercise
  const promptMessage = exercises[exerciseIndex].type === 'weight'
    ? 'Enter weight for new repetition (in kg or lbs):'
    : 'Enter duration for new repetition (in minutes):';

  // Prompt the user for input
  let repValue = prompt(promptMessage);

  // Convert the input to a number and check if it's a valid number
  repValue = parseFloat(repValue);
  if (!isNaN(repValue) && repValue > 0) {
    // Add the new repetition if it's a valid number
    exercises[exerciseIndex].repetitions.push(repValue);
    updateExercisesUI();
  } else {
    alert('Please enter a valid number.');
  }
}


function updateExercisesUI() {
  const list = document.getElementById('exercises-list');
  list.innerHTML = ''; // Clear the list

  exercises.forEach((exercise, index) => {
    const li = document.createElement('li');
    li.classList.add('exercise');
    li.innerHTML = `
            <strong>${exercise.name}</strong> (${exercise.type})
            <button onclick="addRepetition(${index})">Add Repetition</button>
            <ul>${exercise.repetitions.map(rep => `<li class="repetition">${rep}</li>`).join('')}</ul>
        `;
    list.appendChild(li);
  });
}

function deleteExercise(exerciseIndex) {
  // Remove the exercise from the array
  exercises.splice(exerciseIndex, 1);
  updateExercisesUI(); // Update the UI after deletion
}

function deleteRepetition(exerciseIndex, repIndex) {
  // Remove the specified repetition from the exercise
  exercises[exerciseIndex].repetitions.splice(repIndex, 1);
  updateExercisesUI(); // Update the UI after deletion
}

function updateExercisesUI() {
  const list = document.getElementById('exercises-list');
  list.innerHTML = ''; // Clear the list before repopulating

  exercises.forEach((exercise, exerciseIndex) => {
    const exerciseLi = document.createElement('li');
    exerciseLi.classList.add('exercise');
    let repsList = '<ul>';

    exercise.repetitions.forEach((rep, repIndex) => {
      repsList += `<li class="repetition">${rep} <button onclick="deleteRepetition(${exerciseIndex}, ${repIndex})">Delete Rep</button></li>`;
    });
    repsList += '</ul>';

    exerciseLi.innerHTML = `
            <strong>${exercise.name}</strong> (${exercise.type})
            <button onclick="addRepetition(${exerciseIndex})">Add Repetition</button>
            <button onclick="deleteExercise(${exerciseIndex})">Delete Exercise</button>
            ${repsList}
        `;

    list.appendChild(exerciseLi);
  });
}
