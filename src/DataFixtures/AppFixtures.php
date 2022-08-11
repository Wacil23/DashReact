<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Car;
use App\Entity\Invoice;
use App\Entity\Customer;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $carsFaker = (new \Faker\Factory())::create();
        $carsFaker->addProvider(new \Faker\Provider\Fakecar($carsFaker));

        for($c = 0; $c < 35; $c++){
            $customer = new Customer();
            $customer->setFirstName($faker->firstName())
                    ->setLastName($faker->lastName())
                    ->setEmail($faker->email())
                    ->setAdress($faker->address())
                    ->setPhone($faker->e164PhoneNumber());
            $manager->persist($customer);

            for($i = 0; $i < mt_rand(3, 10); $i++) {
                $invoice = new Invoice();
                $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setPaymentMethod($faker->randomElement(['CASH', 'CHEQUE', 'BANK TRANSFER' ]))
                        ->setCustomer($customer);
                $manager->persist($invoice);
            }
        }
        for($i = 0; $i < 20; $i ++){
            $cars = new Car();
            $cars->setModel($carsFaker->vehicleModel())
                 ->setYear($carsFaker->biasedNumberBetween(1998,2017, 'sqrt'))
                 ->setBrand($carsFaker->VehicleBrand())
                 ->setKilometers($carsFaker->randomNumber(6))
                 ->setPrice($faker->randomFloat(2, 1500, 25000))
                 ->setStatus($faker->randomElement(['FOR SALE', 'SOLD']))
                 ->setNbDoors($carsFaker->vehicleDoorCount())
                 ->setFuel($carsFaker->vehicleFuelType())
                 ->setType($carsFaker->vehicleType())
                 ->setGearbox($carsFaker->vehicleGearBoxType());
            $manager->persist($cars);
        }
        $manager->flush();
    }
}
