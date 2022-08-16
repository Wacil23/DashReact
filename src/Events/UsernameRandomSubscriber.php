<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;

class UsernameRandomSubscriber {

    private $security;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['usernameRandom', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function usernameRandom(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        dd($method);
        if($result instanceof User && $method === 'POST') 
        {   
            $firstString = mb_substr($this->user->getFirstName(), 0, 1);
            $removeAccent = iconv('utf-8', 'us-ascii//TRANSLIT', $firstString);;
            $lastName = $this->user->getLastName();
            $randomNumber = random_int(1, 10);
            $username = $removeAccent . '' .$lastName . '' . $randomNumber*10;
            $result->setUsername($username);
            dd($result);
        }

    }

}