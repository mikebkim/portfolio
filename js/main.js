// Nav Targets

$('a[href^="#"]').on('click', function (event) {

    var target = $(this.getAttribute('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});

// Scroll to Top
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});

// Underline Nav

$("[data-menu-underline-from-center] a").addClass("underline-from-center");

// Contact

var frmvalidator = new Validator("contactform");
frmvalidator.addValidation("name", "req", "Please provide your name");
frmvalidator.addValidation("email", "req", "Please provide your email");
frmvalidator.addValidation("email", "email",
    "Please enter a valid email address");

$errors = '';
$myemail = 'yourname@website.com';//<-----Put Your email address here.
if (empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['message'])) {
    $errors.= "\n Error: all fields are required";
}
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
if (!preg_match(
    "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
    $email_address)) {
    $errors.= "\n Error: Invalid email address";
}

if (empty($errors)) {
    $to = $myemail;
    $email_subject = "Contact form submission: $name";
    $email_body = "You have received a new message. ".
" Here are the details:\n Name: $name \n ".
"Email: $email_address\n Message \n $message";
    $headers = "From: $myemail\n";
    $headers.= "Reply-To: $email_address";
    mail($to, $email_subject, $email_body, $headers);
    //redirect to the 'thank you' page
    header('Location: contact-form-thank-you.html');
}