<?php

namespace App\Events;

use App\Entity\User;
use App\Services\MailerService;
use Doctrine\ORM\Events;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;





class UserSubscriber implements EventSubscriberInterface
{
    public function __construct(private MailerService $mailerService)
    {
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        if (!$args->getObject() instanceof User) {
            return;
        }

        /** @var User */
        $user = $args->getObject();

       $this->mailerService->sendEmail(
            from: 'noreply@dashboard.com',
            to: $user->getEmail(),
            subject: 'Vos identifiants',
            template: 'sign-up/signup.html.twig',
            firstname: $user->getFirstname(),
            lastname: $user->getLastname(),
            password: $user->getPlainPassword(),
            username: $user->getUsername()
        );
    }

    public function getSubscribedEvents()
    {
        return [
            Events::postPersist,
        ];
    }
}