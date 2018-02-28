<?php

$EmailTo = "tjallen91@hotmail.co.uk";
$Subject = "Nice & Simple Contact Form by CSS-Tricks";
$Name = Trim(stripslashes($_POST['name']));
$Email = Trim(stripslashes($_POST['email']));
$Message = Trim(stripslashes($_POST['message']));

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "message: ";
$Body .= $Message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From: Contact Form");

// redirect to success page
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>
