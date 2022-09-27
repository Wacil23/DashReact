<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class MeController
{

    public function __construct(private TokenStorageInterface $tokenStorage)
    {
    }

    public function __invoke(): User
    {
        return $this->tokenStorage->getToken()->getUser();
    }
}