import $ from "jQuery";

var DemograficMarkTool = require('./index');
var servicesApi = new DemograficMarkTool.ServicesApi();
var authorsApi = new DemograficMarkTool.AuthorsApi();

let limit_const = 100;

servicesApi.getSources(function (error, data, response) {
    if (error != null) {
        alert(error);
        return;
    }
    if (data != null) {
        var select = document.getElementById("sources");
        for (let i = 0; i < data.length; i++) {
            var opt = data[i];
            var el = document.createElement("option");
            el.textContent = opt.name;
            el.value = opt.name;
            select.onchange = function () {
                for (var i = 1; i < select.options.length; i++) {
                    let option = select.options[i];
                    if (option.selected) {
                        // let arrAuthors = getAuthors(limit_const, 0);
                        let el = document.getElementById("id_name");
                        if (el.value == null) {
                            alert("Fill user id");
                            return;
                        }
                        authorsApi.getAuthorsList(option.textContent, el.value, limit_const, 0,
                            function (error, data, response) {
                                if (error != null) {
                                    alert(error);
                                    return;
                                }
                                if (data != null) {
                                    fillAuthor(data, 0, true);
                                    if (data.length === limit_const) {
                                        $(".authors ul").on("scroll", scrolling);
                                    }
                                } else {
                                    alert("No authors");
                                }
                            });
                    }
                }
            };
            select.appendChild(el);
        }
    } else {
        alert("No sources");
    }
});

servicesApi.getLabels(function (error, data, response) {
    if (error != null) {
        alert(error);
        return;
    }
    if (data != null) {
        var select = document.getElementById("gender");
        for (let i = 0; i < data.length; i++) {
            var opt = data[i];
            var el = document.createElement("option");
            el.textContent = opt.value;
            el.value = opt.value;
            select.appendChild(el);
        }
    } else {
        alert("No labels");
    }
});

$('#authors_names').on("click", 'li', function () {
    $('#authors_names li').css('text-decoration', 'none').removeClass('clicked');
    $(this).css('text-decoration', 'underline').addClass('clicked');
});

function fillAuthor(arrAuthors, lastNum, clear) {
    // var arrAuthors = getAuthors();
    var ulAuthor = document.getElementById("authors_names");
    if (clear) {
        ulAuthor.innerHTML = "";
    }
    for (let i = 0; i < arrAuthors.length; i++) {
        let picture = arrAuthors[i].avatar;
        let name = arrAuthors[i].name;
        let nick = arrAuthors[i].nickname;
        let gender = arrAuthors[i].userLabel.value;
        let userId = arrAuthors[i].id;

        let elem = document.createElement("li");
        elem.id = userId;

        elem.innerHTML =
            "<div class=\"imgWrapper\">" +
            "<img src=\"" + picture + "\" alt=\"No picture\">" +
            "</div>" +
            "<div class=\"authorInfoWrapper\">" +
            "<div class=\"name\">Name: " + name + "</div>" +
            "<div class=\"nickname\">Nickname: " + nick + "</div>" +
            "<div class=\"label\"" + " id=\"" + userId + "\">" + gender + "</div>" +
            "</div>";
        elem.onclick = function () {
            var ulAuthorPost = document.getElementById("authors_texts");
            ulAuthorPost.innerHTML = "";
            authorsApi.getAuthorsPostsList(elem.id, limit_const, 0, function (error, arrAuthorPost) {
                if (error != null) {
                    alert(error);
                    return;
                }
                if (arrAuthorPost != null) {
                    for (var i = 0; i < arrAuthorPost.length; i++) {
                        let elem = document.createElement("li");
                        elem.id = arrAuthorPost[i].id;
                        elem.textContent = arrAuthorPost[i].value;
                        ulAuthorPost.appendChild(elem);
                    }
                }
            });
        };
        ulAuthor.appendChild(elem);
    }
}



//replace gender
var chooseSelectGender = document.getElementById("gender");
chooseSelectGender.onchange = function () {
    for (var i = 0; i < chooseSelectGender.options.length; i++) {
        var option = chooseSelectGender.options[i];
        if (option.selected) {
            let selectedAuthorGenderElem = document.querySelector(".clicked .label");
            selectedAuthorGenderElem.textContent = option.text;
            selectedAuthorGenderElem.style.color = "red";
            document.querySelector(".clicked .label").className += " changed";
        }
    }
};

var ok = document.getElementById("submit");
ok.onclick = function () {
    var authorIdGender = {};
    var changed = document.getElementsByClassName("label changed");
    let userIdEl = document.getElementById("id_name");
    if (userIdEl.value == null) {
        alert("Fill user id");
        return;
    }

    for (let i = 0; i < changed.length; i++) {
        let changedElement = changed[i];
        authorsApi.labelAuthor(changedElement.id, userIdEl.value, changedElement.textContent,
            function (error, data, response) {
                if (error == null) {
                    changedElement.classList.remove('changed');
                    changedElement.style.color = "black";
                }
            });
    }
};

function loader(scrollElement) {
    var target = document.getElementById('authors_names');
    var num = parseInt(target.lastChild.id);

    let el = document.getElementById("id_name");
    if (el.value == null) {
        alert("Fill user id");
        return;
    }

    scrollElement.unbind("scroll");
    let sourceName = document.getElementById("sources");
    authorsApi.getAuthorsList(sourceName.value, el.value, limit_const, num + 1,
        function (error, data, response) {
            if (error != null) {
                alert(error);
                return;
            }
            if (data != null) {
                fillAuthor(data, num, false);
                if (data.length === limit_const) {
                    scrollElement.bind("scroll");
                    $(".authors ul").on("scroll", scrolling);
                }
            } else {
                alert("No authors");
            }
        });
}

function scrolling() {
    let $1 = $(this);
    var currentHeight = $1.children(".authors ul li").height();
    if ($1.scrollTop() >= (currentHeight - $1.height() - 5000)) {
        loader($1);
    }
}