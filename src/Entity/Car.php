<?php

namespace App\Entity;

use App\Entity\Invoice;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CarRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CarRepository::class)]
#[ApiResource(
    normalizationContext: [
        "groups" => ['cars_read']
    ],
    collectionOperations: ['POST'],
    itemOperations: ['GET', 'PUT'],
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ['model', 'year', 'kilometers', 'brand', 'price', 'status', 'nbDoors', 'fuel', 'type', 'gearbox']
),
]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $model = null;

    #[ORM\Column]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?int $year = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $brand = null;

    #[ORM\Column]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?int $kilometers = null;

    #[ORM\Column]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?float $price = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $status = null;

    #[ORM\Column]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?int $nbDoors = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $fuel = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?string $gearbox = null;

    #[ORM\OneToOne(mappedBy: "car", cascade: ['remove'])]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    #[Groups(['cars_read'])]
    private ?Invoice $invoice = null;

    #[ORM\Column]
    #[Groups(['cars_read', 'invoices_read'])]
    private ?bool $isSold = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getKilometers(): ?int
    {
        return $this->kilometers;
    }

    public function setKilometers(int $kilometers): self
    {
        $this->kilometers = $kilometers;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

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

    public function getNbDoors(): ?int
    {
        return $this->nbDoors;
    }

    public function setNbDoors(int $nbDoors): self
    {
        $this->nbDoors = $nbDoors;

        return $this;
    }

    public function getFuel(): ?string
    {
        return $this->fuel;
    }

    public function setFuel(string $fuel): self
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getGearbox(): ?string
    {
        return $this->gearbox;
    }

    public function setGearbox(string $gearbox): self
    {
        $this->gearbox = $gearbox;

        return $this;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(Invoice $invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function isIsSold(): ?bool
    {
        return $this->isSold;
    }

    public function setIsSold(bool $isSold): self
    {
        $this->isSold = $isSold;

        return $this;
    }

}
