//Set todo list variable

var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


$(document).ready(function() {



    for (var i = 0; i <= 6; i++) {
        if (localStorage.getItem(days[i]) != null) {

            $('#' + days[i]).append('<li><a id="todo_link" href="#edit" data-todo_name =' + localStorage.getItem(days[i]) +
                '>' + localStorage.getItem(days[i]) + '</a></li>');
        }
        $('#' + days[i]).listview('refresh');
    }

    //Add Todo
    $('#add_form').submit(function() {
        var todo_name = $('#todo_name').val();
        var todo_date = $('#addDate option:selected').text();

        if (todo_name == '') {
            alert('Please give the todo a name');
        } else {

            localStorage.setItem(todo_date, todo_name);
        }
        $('#todo_name').val("");
        $('#addDate option').get('0').selected = true
    });

    //Edit Todo
    $('#edit_form').submit(function() {
        currentTodoName = localStorage.getItem('currentTodoName');
        currentTodoDate = localStorage.getItem('currentTodoDate');
        //Loop through todos

        localStorage.removeItem(currentTodoDate);

        //Create a new todo
        var todo_name_edit = $('#todo_name_edit').val();
        var todo_date_edit = $('#editDate option:selected').text();


        localStorage.setItem(todo_date_edit, todo_name_edit);
    });

    //Delete Todo
    $('#edit_form').on('click', '#delete', function() {

        currentTodoDate = localStorage.getItem('currentTodoDate');
        //Loop through todos
        localStorage.removeItem(currentTodoDate);
        //Close and go home
        $.mobile.changePage($('#home'), 'pop');
    });


    $('#selectDay ul').on('click', function(event) {
        localStorage.setItem('currentTodoName', localStorage.getItem($(this).attr('id')));
        localStorage.setItem('currentTodoDate', $(this).attr('id'));
    });

    //Insert current data into edit form
    $(document).on('pageshow', '#edit', function() {
        for (var i = 0; i <= 6; i++) {
            if (days[i] == localStorage.getItem('currentTodoDate')) {
                $('#editDate option').get(i + 1).selected = true;
            }
        }

        currentTodoName = localStorage.getItem('currentTodoName');
        $('#edit_form input[name=todo_name_edit]', this).val(currentTodoName);


    });

    $(document).on('pageshow', '#home', function() {
        window.location.reload();
    });

    //Clear Todos
    $('#clear_btn').click(function() {
        localStorage.clear();
    });


});
