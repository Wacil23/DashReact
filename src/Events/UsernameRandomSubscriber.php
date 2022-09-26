<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use function PHPSTORM_META\type;
use function PHPUnit\Framework\isType;

class UsernameRandomSubscriber implements EventSubscriberInterface {

    private $security;
    private $repository;

    public function __construct(Security $security, UserRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
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
        // $username = $result->getUsername();

        if($result instanceof User && $method === 'POST') 
        {   
            if($result->getUsername() === null || empty($username)){
                $firstString = mb_substr($result->getFirstName(), 0, 1);
                $removeAccent = iconv('utf-8', 'us-ascii//TRANSLIT', $firstString);;
                $lastName = $result->getLastName();
                $randomNumber = random_int(1, 10);
                $username = $removeAccent . '' .$lastName . '' . $randomNumber*10;

                $result->setUsername($username);
            }
        }

    }

}