
        // this array will hold all of the words that can be guessed in the game

        var words = ["harry potter","deathly hallows", "slythern", "hufflepuff","gryffindor",
                    "ravenclaw","ron weasley", "hermione granger", "albus dumbledore"];

        // this object holds different pictures which to populate based on the amount of incorrect guesses

        var picture=[{
                pic:"././assets/images/HM1.JPG"
            },{
                pic:"././assets/images/HM2.jpg"
            },{
                pic:"././assets/images/HM3.jpg"
            },{
                pic:"././assets/images/HM4.jpg"
            },{
                pic:"././assets/images/HM5.jpg"
            },{
                pic:"././assets/images/HM6.jpg"
            },{
                pic:"././assets/images/HM7.jpg"
            }];

        var letters = [];
        var letterInstances = [];
        var dashes = [];
        var wrong = [];
        var wins = 0;
        var loss = 0;
        var wordSelect=[];
        var hangManPic=0;

        
        
        run();

        function run() {
            letters = [];
            dashes = [];
            wrong = [];
            wordSelect = [];
            hangManPic=0;

            $(".hangman").empty();
            $(".wrongL").empty();
            $(".HMpic").empty();
            $(".incorrect-sect").empty();
            $(".incorrect-sect").html("Incorrect Letters:");


            $(".win-number").html(wins);
            $(".loss-number").html(loss);
            $(".HMpic").html()

            // this will select a random word from the words array and store it as wordSelected and then push the word
            //  to the wordSelect array
            var wordSelected = words[Math.floor(Math.random() * words.length)];
                 wordSelect.push(wordSelected);
            
            // this takes the word from the wordSelected array and splits the letters up storing it as a lettersSep variable
            // then the separate letters in that variable are pushed into the letters array
            var lettersSep = wordSelected.split("");
                letters.push(lettersSep);

            console.log(letters[0]);

            addDashes();
        }


        function addDashes() {
            console.log(letters.length)

            // this will loop through the letters array and for each letter a dash will be created. If there
            // is a space in the word or name then a - will be created and the results will be pushed into the dashes array
            for (i = 0; i < letters[0].length; i++) {
                var dash = ("_ ");
                var noDash=(" ");
                if(letters[0][i] === noDash){
                    dashes.push("-");
                }
                else if(letters[0][i] !== noDash){
                dashes.push(dash);
                }
            }

            // this will take what has been placed into the dashes array, loop through it and append the results
            // onto the hangman class

            for (w = 0; w < dashes.length; w++) {

                $('.hangman').append(dashes[w]);
            }
            console.log(dashes +"dash");

            addHangManPic();

        }


        function addHangManPic(){
            // this section goes to the array picture which hold objects of different pictures to display on screen.
            // how many incorrect answers there are would determine which picture would be selected. the picture is then
            // send to the class HMpic
             var firstPic = picture[hangManPic].pic;
             var HMP = $("<img>");
                 HMP.attr("src",  firstPic);
      

             $(".HMpic").html(HMP);
}




        // this is an event that is triggered when the user selects a letter on the keyboard.
        // it first clears the letterInstances array and stores the letter pressed as a variable ltr
        document.onkeyup = function(event) {
            event.preventDefault();
            var letterInstances = [];
            var ltr = String.fromCharCode(event.keyCode).toLowerCase();
           



            // this takes the letters array and compares it to the letter selected by the user.
            // if there is a match between user selection and letter in array then it pushes the index of that letter
            // into the letterInstances array
            for (g = 0; g < letters[0].length; g++) {
                if (letters[0][g] == ltr) {
                    letterInstances.push([g]);
                }

            }

            // this limits the user from continuously selecting letters after losing the game
            if(wrong.length >= 6){
                alert("You have lost. Click play again to try and win!")

            }

            // this stops the user from wasting a turn by selecting space accidentally
            else if (ltr === " ") {
                alert("space is not a Letter");

            }
            // if the user selects anything other than space as an option it will see if that letter exists in the array
            // of letters. if it does then it will loop through the letter instances array which holds the index of the 
            // letters and run each index and the letter through the ltrCorrect function. If it is not in the array of 
            // letter then it will run the letter through ltrIncorrect function
             else if (ltr !== " ")
            {
                var blank = letters[0].indexOf(ltr);
               
                if (blank !== -1) 
                {
                    for (e = 0; e < letterInstances.length; e++) 
                    {
                        var letterIndex = (letterInstances[e]);
                        ltrCorrect(letterIndex, ltr);
                    }
                } 
                else 
                {
                    ltrIncorrect(blank, ltr);
                }

            }



        }

        // this function takes the letter and the index of where it is located and uses that information to replace
        // where a dash is in the dashes array with the letter from the ltr variable and uses the letterIndex variable
        // to know which dash to replace. It then loops through the updated dashes array and appends the results to hangman class
        // and run checkWin function
        function ltrCorrect(letterIndex, ltr) 
        {
            
            dashes.splice(letterIndex, 1, ltr)
            $(".hangman").empty()

            for (o = 0; o < dashes.length; o++) 
            {
                var m = dashes[o];
                $(".hangman").append(m);

            }

            checkWin();


        }


        // if this funtion is run it increases the number on the hangManPic variable so a new picture will display.
        // it pushes the wrong letter into the wrong array and displays all of the wrong letters by looping through
        // the array and appending it to the wrongL class
        function ltrIncorrect(blank, ltr) 
        {

             hangManPic++

            if (blank === -1)
             {
                $(".wrongL").empty();
                wrong.push(ltr);
                for (q = 0; q < wrong.length; q++)
                {
                    $(".wrongL").append(wrong[q]);
                }
               

            //    if the number of wrong letters in the wrong array is equal to or exceeds 6 then the game is over, the 
                
            //   word is shown and a loss is added to the loss talley. a button is created and selecting it a new game will start
                if (wrong.length >= 6)
                {
                     $(".hangman").html(wordSelect);
                     
                     loss++;
                     
                     $(".loss-number").html(loss);
                     $(".incorrect-sect").html("YOU LOSE!");
                        var restartButton = $("<button>");
                        restartButton.text("Click to play again")
                        restartButton.addClass("restart");

                    $(".wrongL").empty();
                        $(".wrongL").append(restartButton);

                
                
                }
//              when button is selected the game restarts but running the run funciton
              $('.restart').on("click",function()
              
              {
                    run();
              })
                
                   
                  
            }
                addHangManPic();
        }
        

        // when this funciton is selected it loops through the array of dashes. If there are no longer dashes in the 
        // array then it means all letters are accounted for and the user wins. A winn talley is added and a buttong
        // is created allowing the user to play again if they choose to.
        function checkWin()
        {
            var dashCheck = dashes.indexOf("_ ");
           
            if (dashCheck === -1)
            {
                $(".hangman").html(wordSelect);
                wins++;
               
                $(".win-number").html(wins);
                $(".incorrect-sect").html("YOU WIN!");
                         var restartButton = $("<button>");
                        restartButton.text("Click to play again")
                        restartButton.addClass("restart");

                 $(".wrongL").empty();
                 $(".wrongL").append(restartButton);

                
                
            }
              
              $('.restart').on("click",function()
              {
                run();

              })
        }