<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    itemOperations: [
        'GET', 
        'PUT', 
        'DELETE'
    ],
    attributes: [
        'pagination_enabled' => false,
        'pagination_items_per_page' => 10,
        'order' => ['sentAt' => 'desc'],
    ],
    normalizationContext: ['groups' => ['invoices_read']],
    denormalizationContext: [
        'disable_type_enforcement' => true
    ],

    subresourceOperations: [
        'api_customers_invoices_get_subresource' => ['normalization_context' => ['groups' => 'invoices_subresource']]
    ],

)]
#[ApiFilter(
    SearchFilter::class,
    properties: ['amount', 'paymentMethod']
),
]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read'])]
    private ?float $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['invoices_read', 'customers_read'])]
    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_read', 'customers_read'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices_read'])]
    private ?Customer $customer = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read',  'customers_read', 'invoices_read'])]
    private ?string $paymentMethod = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read'])]
    private ?int $chrono = null;

    #[ORM\OneToOne(inversedBy: 'invoice', cascade: ['persist', 'remove'])]
    #[Groups(['invoices_read'])]
    private ?Car $car = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getPaymentMethod(): ?string
    {
        return $this->paymentMethod;
    }

    public function setPaymentMethod(string $paymentMethod): self
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }

    /**
     * @Groups({"invoices_read"})
     * @return User
     */
    public function getUser(): User{
        return $this->customer->getUser();
    }
}
