// we declare the todos array globally
var todos = [];

$("input[type='text']").keypress(function (event) {
    var todoText = $(this).val(); //when we press enter $(this).val() will get the input that we type and we are storing the input to var todoText
    if (event.which === 13 && todoText.trim() !== '') {  //code 13 is for enter key and trim removes the white spaces. means it blocks us to add empty todo
        $(this).val(""); //this is to clear out the text from the input box after hitting enter
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>") //creating a new li with span on keypress and adding it to the ul
        todos.push(todoText); // we save the new todo to the todos array
        saveTodos(); //saving to local storage
    }
});

$("ul").on("click", "span", function (event) { //by clicking on span inside of ul
    var todoText = $(this).parent().text().trim(); //removing the todo
    var index = todos.indexOf(todoText); //index
    if (index !== -1) {
        todos.splice(index, 1); //by clicking on span tag we are splicing 1 todo from the todos array
    }
    saveTodos(); //saving to local storage
    $(this).parent().fadeOut(500, function () { // //when we click on the text inside the span tag, the whole li tag will fade out
        $(this).remove(); ////the faded li tag will be removed completely
    });
    event.stopPropagation(); //this code is used to stop the bubbling effect
});

$(".fa-plus-square").click(function () { //selecting the plus icon
    $("input[type='text']").fadeToggle(); //toggling fade effect on click event
});

// sava data to local storage
function saveTodos() {
    var storedList = JSON.stringify(todos);
    localStorage.setItem("todoList", storedList);
}

// get data from local storage
function getTodos() {
    if (localStorage.getItem("todoList") !== null) {
        todos = JSON.parse(localStorage.getItem("todoList"));
    }
}

getTodos();

todos.forEach(function (todoText) {
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
});
