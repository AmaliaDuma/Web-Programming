const boxes = Array.from(document.getElementsByClassName('box'));
const playText = document.getElementById('play-text');
const restart = document.getElementById('restart');
var wins_X = 0;
var wins_O = 0;

const spaces = [null, null, null, null, null, null, null, null, null]
const user_text = "X";
const ai_text = "O";
let crt_player = user_text; 


const addEvents = () => {
    boxes.forEach((box) =>{
        box.addEventListener('click', boxClicked);
    });

    restart.addEventListener('click', restartClicked);
};

const boxClicked = (e) => {
    //We need the id of the box clicked
    const id = e.target.id.charAt(1);
    console.log(id);

    //Make the move if valid
    if (!spaces[id]){
        spaces[id] = crt_player;
        e.target.innerText = crt_player;

        //Check if someone has won
        if (playerWon()){
            //playText.innerText = `${crt_player} has won!`;
            if (crt_player == user_text){
                wins_X = wins_X + 1;
                playText.innerText = `${crt_player} has won exactly ${wins_X} times.`;
            }
            else{
                wins_O = wins_O + 1;
                playText.innerText = `${crt_player} has won exactly ${wins_O} times.`;
            }
            return;
        }

        //Change the player turn
        crt_player = crt_player === user_text ? ai_text : user_text;
        moveAi();
    }
};

const moveAi = () => {
    for (i=0; i<spaces.length; i++) {
        if (!spaces[i]){
            spaces[i] = crt_player;
            let id_aux = 'b' + i;
            document.getElementById(id_aux).innerText = crt_player;

            //Check if someone has won
            if (playerWon()){
                //playText.innerText = `${crt_player} has won!`;
                wins_O = wins_O + 1;
                playText.innerText = `${crt_player} has won exactly ${wins_O} times.`;
                return;
            }

            //Change the player turn
            crt_player = crt_player === user_text ? ai_text : user_text;
            return;
        }
    }
};

const getFreeSpace = () => {

}

const playerWon = () => {
    if (spaces[0] === crt_player){
        if (spaces[1] === crt_player && spaces[2] === crt_player){
            console.log(`${crt_player} wins up top.`);
            return true;
        }
        if (spaces[3] === crt_player && spaces[6] === crt_player){
            console.log(`${crt_player} wins on the left.`);
            return true;
        }
        if (spaces[4] === crt_player && spaces[8] === crt_player){
            console.log(`${crt_player} wins diagonally.`);
            return true;
        }
    }
    if (spaces[8] === crt_player){
        if (spaces[2] === crt_player && spaces[5] === crt_player){
            console.log(`${crt_player} wins on the right.`);
            return true;
        }
        if (spaces[6] === crt_player && spaces[7] === crt_player){
            console.log(`${crt_player} wins on the bottom.`);
            return true;
        }
    }
    if (spaces[4] === crt_player){
        if (spaces[1] === crt_player && spaces[7] === crt_player){
            console.log(`${crt_player} wins vertically in the middle.`);
            return true;
        }
        if (spaces[3] === crt_player && spaces[5] === crt_player){
            console.log(`${crt_player} wins horizontally in the middle.`);
            return true;
        }
    }
}

const restartClicked = (e) => {
    //Clear the array
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })

    //Clear the text from the boxes
    boxes.forEach((box) => {
        box.innerText = '';
    })

    //Clear the '.. won' text
    playText.innerText = `Let's play!`

    //Set the current player to be the user
    crt_player = user_text;
}

addEvents();