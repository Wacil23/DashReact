<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'app_app', requirements:["reactRouting"=>".+"], defaults:["reactRouting"=> null])]
    public function index(): Response
    {
        return $this->render('app/index.html.twig', [
        ]);
    }
}
