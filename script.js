
// const registerBtn=document.getElementById("registerBtn")
// registerBtn.addEventListener("click",register)
let QuizPlayers = [];
function login(){
    let userName=document.getElementById('username').value
    let password=document.getElementById('finalpassword').value
    // const userData = JSON.parse(localStorage.getItem(username)) || [];
    const userDataString = localStorage.getItem(userName);
    const userData = JSON.parse(userDataString);

// Check if userData is valid and contains the required fields
if (userData) {
    let userName1 = userData.userName;
    let password1 = userData.password;

    console.log('Stored User Name:', userName1);
    console.log('Stored Password:', password1);

    // Validate the credentials
    if (userName === userName1 && password === password1) {
        window.location.replace("quizCreate.html");
        window.alert("Login done");
    } else {
        window.alert("Invalid credentials");
    }
} else {
    window.alert("No user data found");
}
    
}


function register(){
    let userName=document.getElementById('username').value
    let email=document.getElementById('email').value
    let password=document.getElementById('userPassword').value
    if(userName && password && email)
    {
        const userObject={
            userId:Math.random(),
            userName:userName,
            email:email,
            password:password
        }
        store(userObject)
        window.location.replace("quizCreate.html");
    }
    else
    {
        window.alert("Please add all the fields")
    }
    
}
function store(userObject)
{
    localStorage.setItem(userObject.userName,JSON.stringify(userObject))
}

// const addQues=document.getElementById("addQuestion")
// addQues.addEventListener("click",addQuestion)
let questions = [];
function addQuestion() {
    const questionText = document.getElementById('question').value;
    const optionsText = document.getElementById('options').value;
    const correctIndex = parseInt(document.getElementById('correct').value, 10);
    const options = optionsText.split(',').map(opt => opt.trim());

    if(questionText && optionsText && correctIndex)
    {
        questions.push({
            question: questionText,
            options: options,
            correct: correctIndex
        });
    
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
    
        document.getElementById('question').value = '';
        document.getElementById('options').value = '';
        document.getElementById('correct').value = '';
    
        generateLink();
    }
    else if(correctIndex==0)
    {
        questions.push({
            question: questionText,
            options: options,
            correct: correctIndex
        });
    
        localStorage.setItem('quizQuestions', JSON.stringify(questions));
    
        document.getElementById('question').value = '';
        document.getElementById('options').value = '';
        document.getElementById('correct').value = '';
    
        generateLink();
    }
    else
    {
        window.alert("Please add all the fields properly")
    }
   
}
var userNameFinal;
function AddQuizPlayerName() {
    let userName1 = document.getElementById('username').value;
    if(!userName1)
    {
        window.alert("Please add user name!")
    }
    else
    {
        console.log(userName1)
        userNameFinal=userName1;
        let userObject = {
            userName: userName1,
            score: null
        };
        QuizPlayers.push(userObject)
        localStorage.setItem('QuizPlayers', JSON.stringify(QuizPlayers));
        window.location.href = 'quiz.html';
    }
}
// function quizLogin() {
//     console.log("quizLogin function called");

//     let storedUser = localStorage.getItem('QuizPlayers');
//         // User is not logged in, display the login prompt
//     const link1 = document.createElement('a');
//     link1.href = 'quizLogin.html';
//     link1.textContent = 'Please Login Before Playing The Quiz';
//     link1.style.color = "red";
//     document.getElementById('link1').innerHTML = '';
//     document.getElementById('link1').appendChild(link1);
    
// }

function quizLogin() {
    console.log("quizLogin function called");

    // let storedUser = localStorage.setItem('QuizPlayers');
        // User is not logged in, navigate to the login page
    window.location.href = 'quizLogin.html';
    let userName1 = document.getElementById('username').value;
}

function generateLink() {
    const link = document.createElement('a');
    link.href = 'quiz.html';
    link.textContent = 'Click here to take the quiz!!';
    link.style.color = "red";
    document.getElementById('link').innerHTML = '';
    document.getElementById('link').appendChild(link);

    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        quizLogin(); // Call quizLogin when the link is clicked
    });
}
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    const quizContainer = document.getElementById('quiz');
    questions.forEach((q,index) => {
        // console.log(q)
        // console.log(index)
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((opt, i) => `
                <input type="radio" name="q${index}" value="${i}"> ${opt}<br>
            `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Function to submit the quiz and display the result
function submitQuiz() {
    const questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    let score1 = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value, 10) === q.correct) {
            score1++;
        }
    });
    document.getElementById('result').textContent = `Your score: ${score1} / ${questions.length}`;
    const userDataString = localStorage.getItem('QuizPlayers');
    const userData = JSON.parse(userDataString);
    userData[0].score=score1;
    localStorage.setItem('QuizPlayers', JSON.stringify(userData));
    window.alert("Well Done Champ!! Your Score is saved")
    // console.log(userNameFinal);
    // for(let i=0;i<userData.length;i++)
    // {
    //     if(userData[i].userName==userNameFinal)
    //     {
            

    //     }
    // }
    
}
window.onload = loadQuestions;
