// Variable names for the DOM elements 
let counter = document.querySelector('#counter');  
let heart = document.querySelector('#heart');
let plus = document.querySelector('#plus');
let minus = document.querySelector('#minus');
let comments = document.getElementById("list");
let submit = document.getElementById("submit");
let commentBox = document.getElementById("comment-input"); 
let likesObj = {}; 

// Initialize timer  
let pause = false; 
let time = 0; 

// Start the timer
function handleTimer(){
    function startTimer(){
            time ++ ;
            document.querySelector('#counter').innerHTML = time
    }

    // Pause and resume the timer when button pressed 
    let intervalID = setInterval( startTimer, 1000);
        function togglePause () {
            if (pause == false){
                pause = true; 
                clearInterval(intervalID);
                heart.setAttribute("disabled", "true");
                plus.setAttribute("disabled", "true");
                minus.setAttribute("disabled", "true");
                submit.setAttribute("disabled", "true");
                document.getElementById('pause').textContent='resume'
            }
            else {
                pause = false;
                heart.removeAttribute("disabled");
                plus.removeAttribute("disabled");
                minus.removeAttribute("disabled");
                submit.removeAttribute("disabled");
                intervalID = setInterval( startTimer, 1000); 
                document.getElementById('pause').textContent='pause'
            }
        }
        
        // Functions for Plus and Minus buttons 
        function handlePlus (){
            clearInterval(intervalID);
            time++; 
            document.querySelector('#counter').innerHTML = time;
            intervalID = setInterval( startTimer, 1000); 
        }
        function handleMinus (){
            clearInterval(intervalID);
            time--; 
            document.querySelector('#counter').innerHTML = time;
            intervalID = setInterval( startTimer, 1000); 
        }
        
        //Listners for the plus, minus, and pause buttons 
        plus.addEventListener('click', handlePlus); 
        minus.addEventListener('click', handleMinus);
        document.getElementById('pause').addEventListener('click', togglePause)

}

// Click heart to like

function likeHandler () {
    let count = document.querySelector('#counter').innerHTML

    if (likesObj[count]){
        likesObj[count]++;
    }
    else {
        likesObj[count] = 1; 
    }
    updateLikes();    
}

function updateLikes () {
    let likes = document.querySelector('ul.likes');
    likes.innerHTML = ""; 
    for (let i in likesObj){
        let li = document.createElement('li'); 
        let count = document.querySelector('#counter').innerHTML
        li.textContent = `${i} has been liked ${likesObj[i]} times!`
        likes.appendChild(li)  
    }
}

// Submit a comment
function commentHandler(event){
    event.preventDefault();
    let p = document.createElement("p"); 
    p.textContent = commentBox.value; 
    comments.appendChild(p);
    commentBox.value = ""; 
}

document.addEventListener('DOMContentLoaded', handleTimer)
heart.addEventListener('click', likeHandler)
submit.addEventListener('click', commentHandler)






