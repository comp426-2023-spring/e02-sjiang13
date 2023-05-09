// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function shots() {
    let check = document.getElementById('opponent');
    let rps = document.getElementById('rps').checked;

    // Show or hide radio buttons
    if (check.checked) {
        if (rps) {
            $(".input-container.rps").show();
            $(".input-container.rpsls").hide();
            $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors']").show();
            $("label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").hide();
        } else {
            $(".input-container.rps").show();
            $(".input-container.rpsls").show();
            $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors']").show();
            $("label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").show();
        }
    } else {
        $(".input-container.rps").hide();
        $(".input-container.rpsls").hide();
        $("label[class='input-container' for='Rock'], label[class='input-container' for='Paper'], label[class='input-container' for='Scissors']").hide();
        $("label[class='input-container' for='Lizard'], label[class='input-container' for='Spock']").hide();
    }
}

function startOver() {
    document.getElementById('userinput').reset();
    document.getElementById('results').innerHTML = '';
    shots();
}


async function playGame() {
    let game = $('input[type=radio][name=game]:checked').val();
    let shot = $('input[type=radio][name=shot]:checked').val();
    let opponent = document.getElementById('opponent');
    if (opponent.checked) {
        let response = await fetch(window.location.href + 'app/' + game + '/play' + shot);
        let result = await response.json();
        console.log(result);

        let results = document.getElementById('results');
        if (result.error) {
            results.innerHTML = result.error;
        } else {
            let you = `You: ${result.player}`;
            let opponent = `Opponent: ${result.opponent}`;
            let outcome = `Result: ${result.result}`;
            results.innerHTML = `${you}<br>${opponent}<br>${outcome}`;
        }
    } else {
        shot = 'Rock'
    }
}