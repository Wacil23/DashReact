<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Car;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordHasherInterface  $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $carsFaker = (new \Faker\Factory())::create();
        $carsFaker->addProvider(new \Faker\Provider\Fakecar($carsFaker));

        for ($u = 0; $u < 10; $u++) {
            $user = new User();

            $chrono = 1;
            $passwords = $user->setRandomPassword($user->getPassword());
            $hash = $this->encoder->hashPassword($user, 'pass');
            $hashPassword = $user->setPassword($hash);

            $user->setFirstName($faker->firstName())
            ->setLastName($faker->lastName)
            ->setEmail($faker->Email)
            ->setUsername($user->getUsername());
            $user->setPassword($hashPassword);

            $manager->persist($user);

            for ($c = 0; $c < mt_rand(10, 25); $c++) {
                $customer = new Customer();
                $customer->setFirstName($faker->firstName())
                    ->setLastName($faker->lastName())
                    ->setEmail($faker->email())
                    ->setAdress($faker->address())
                    ->setUser($user)
                    ->setPhone($faker->e164PhoneNumber());

                $manager->persist($customer);

                for ($i = 0; $i < mt_rand(1, 5); $i++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']))
                        ->setPaymentMethod($faker->randomElement(['CASH', 'CHEQUE', 'BANK TRANSFER']))
                        ->setCustomer($customer)
                        ->setChrono($chrono);
                        
                        $chrono++;
                        for ($v = 0; $v < mt_rand(1, 5); $v++) {
                            $cars = new Car();
    
                            $cars->setModel($carsFaker->vehicleModel())
                                ->setYear($carsFaker->biasedNumberBetween(1998, 2017, 'sqrt'))
                                ->setBrand($carsFaker->VehicleBrand())
                                ->setKilometers($carsFaker->randomNumber(6))
                                ->setPrice($faker->randomFloat(0, 1500, 25000))
                                ->setNbDoors($carsFaker->vehicleDoorCount())
                                ->setFuel($carsFaker->vehicleFuelType())
                                ->setType($carsFaker->vehicleType())
                                ->setGearbox($carsFaker->vehicleGearBoxType());
                            if ($invoice->getStatus() == 'PAID') {
                                $cars->setStatus('SOLD');
                                $cars->setIsSold(true);
                            }
                            if ($invoice->getStatus() == 'SENT') {
                                $cars->setStatus('ON PENDING');
                                $cars->setIsSold(false);
                            }
                            if ($invoice->getStatus() == 'CANCELLED') {
                                $cars->setStatus('FOR SALE');
                                $cars->setIsSold(false);
                            }
                            $invoice->setCar($cars);
                        }
                    $manager->persist($invoice);

                    $cars->setInvoice($invoice);
                    $manager->persist($cars);
                }
            }
        }
        $manager->flush();
    }
}
