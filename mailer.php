<?
require 'lib/phpMailerAutoload.php';
if(isset($_POST['email'])){
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $css = $_POST['css'];
    $html = $_POST['html'];
    ob_start();
    include 'code_tmpl.php';
    $tmpl = ob_get_clean();
    if(!$email){
        echo json_encode(array('status' => 'error', 'msg' => 'Bad email')); exit();
    }
    $send = email($email, 'Your button from css3 button generator', $tmpl, $file);
    if($send){
        echo json_encode(array('status' => 'ok!', 'msg' => 'Mail success sended!'));exit();
    }else{
        echo json_encode(array('status' => 'error', 'msg' => 'Mail don\'t delivered')); exit();
    }
}


function email($email, $subject, $text, $file){
    $mail = new PHPMailer;
    $mail->From = 'css3generator@webster.uz';
    $mail->FromName = 'css 3 button generator';
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->addAttachment('tmp/' . $file);
    $mail->Subject = $subject;
    $mail->Body    = $text;
    $mail->AltBody = 'HTML и CSS вашей кнопки в прикрипленном файле';
    $res =  $mail->send();
    @unlink('tmp/' . $file);
    return $res;
}
?>
?>