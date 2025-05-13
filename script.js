// Provided functions
function getAverage(scores) {
    if (scores.length === 0) return 0; // Handle empty array
    let sum = 0;
    for (const score of scores) {
        sum += score;
    }
    return sum / scores.length;
}

function getGrade(score) {
    if (score === 100) {
        return "A++";
    } else if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

function hasPassingGrade(score) {
    return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
    let average = getAverage(totalScores);
    let grade = getGrade(studentScore);
    let passed = hasPassingGrade(studentScore);
    
    let message = "Class average: " + average.toFixed(1) + ". Your grade: " + grade + ".";
    if (passed) {
        message += " You passed the course.";
    } else {
        message += " You failed the course.";
    }
    return message;
}

// App logic
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous messages
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    resultDiv.textContent = '';
    errorDiv.textContent = '';
    
    // Get inputs
    const classScoresInput = document.getElementById('classScores').value;
    const studentScoreInput = parseFloat(document.getElementById('studentScore').value);
    
    // Validate student score
    if (isNaN(studentScoreInput) || studentScoreInput < 0 || studentScoreInput > 100) {
        errorDiv.textContent = "Please enter a valid student score between 0 and 100.";
        return;
    }
    
    // Parse and validate class scores
    let classScores = [];
    if (classScoresInput.trim() !== '') {
        classScores = classScoresInput.split(',').map(score => parseFloat(score.trim()));
        // Check for invalid scores
        for (let score of classScores) {
            if (isNaN(score) || score < 0 || score > 100) {
                errorDiv.textContent = "Please enter valid class scores between 0 and 100.";
                return;
            }
        }
    }
    
    // Calculate and display result
    try {
        const message = studentMsg(classScores, studentScoreInput);
        resultDiv.textContent = message;
    } catch (error) {
        errorDiv.textContent = "An error occurred. Please check your inputs.";
    }
});
