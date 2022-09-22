<?php

namespace App\Entity;

use App\Entity\Customer;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: [
        'groups' => 'users_read'
    ]
)]
#[
    ApiFilter(
        SearchFilter::class,
        properties: ['firstName', 'lastName', 'email']
    ),
]
#[UniqueEntity("email", message: "L'email doit être différent")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['users_read', 'customers_read', 'invoices_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['users_read', 'customers_read', 'invoices_read'])]
    #[Assert\NotBlank(message: "L'email doit être reseigner")]
    private ?string $email = null;

    #[ORM\Column(length: 180, nullable: true)]
    #[Groups(['users_read'])]
    private ?string $username = null;

    #[ORM\Column]
    #[Groups(['users_read'])]
    private array $roles = [];

    /**
     * @var string The hashed passwords
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(nullable: true)]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users_read', 'customers_read', 'invoices_read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['users_read', 'customers_read', 'invoices_read'])]
    private ?string $lastName = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Customer::class)]
    #[Groups(['users_read'])]
    private Collection $customers;

    public function __construct()
    {
        $this->customers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }


    public function getUsername(): ?string
    {
        return $this->username;
    }

    /**
     * @Groups({"users_read"})
     * */

    public function setUsername(?string $username)
    {
        if ($username === null || empty($username)) {
            $firstString = mb_substr($this->getFirstName(), 0, 1);
            $removeAccent = iconv('utf-8', 'us-ascii//TRANSLIT', $firstString);;
            $lastName = $this->getLastName();
            $randomNumber = random_int(1, 10);
            $username = $removeAccent . '' . $lastName . '' . $randomNumber * 17;
            $this->username = $username;	
            return $this;
        }
        $firstString = mb_substr($this->getFirstName(), 0, 1);
        $removeAccent = iconv('utf-8', 'us-ascii//TRANSLIT', $firstString);;
        $lastName = $this->getLastName();
        $randomNumber = random_int(1, 10);
        $username = $removeAccent . '' . $lastName . '' . $randomNumber * 17;
        $this->username = $username;
       
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password)
    {
        $this->password = $password;
        return $password;
    }
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword)
    {
        $this->plainPassword = $plainPassword;
        return $plainPassword;
    }

    public function setRandomPassword(?string $password)
    {
        if ($password === null || empty($password)) {
            $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            $password = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $password[] = $alphabet[$n];
            }
            return implode($password); //turn the array into a string
            $this->password = $password;
            return $this;
        }
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $password = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $password[] = $alphabet[$n];
        }
        return implode($password); //turn the array into a string
        $this->password = $password;
        return $this;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Customer>
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers->add($customer);
            $customer->setUser($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getUser() === $this) {
                $customer->setUser(null);
            }
        }

        return $this;
    }
}
