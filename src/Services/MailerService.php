<?php

namespace App\Services;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class MailerService
{
    public function __construct(private MailerInterface $mailer)
    {
    }

    public function sendEmail(
        ?string $from, 
        string $to, 
        string $subject, 
        string $template, 
        string $firstname, 
        ?string $lastname, 
        ?string $message = null, 
        ?string $password = null,
        ?string $username = null)
    {
        
        $email = (new TemplatedEmail())
        ->from($from)
        ->to($to)
        ->subject($subject)
        ->htmlTemplate($template)
        ->context([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'subject' => $subject,
            'message' => $message,
            'password' => $password,
            'username' => $username
        ]);

        $this->mailer->send($email);
    }
}