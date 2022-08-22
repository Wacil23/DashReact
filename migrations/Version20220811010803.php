<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220811010803 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE invoice_car (invoice_id INT NOT NULL, car_id INT NOT NULL, INDEX IDX_DFCC895E2989F1FD (invoice_id), INDEX IDX_DFCC895EC3C6F69F (car_id), PRIMARY KEY(invoice_id, car_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE invoice_car ADD CONSTRAINT FK_DFCC895E2989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE invoice_car ADD CONSTRAINT FK_DFCC895EC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice_car DROP FOREIGN KEY FK_DFCC895E2989F1FD');
        $this->addSql('ALTER TABLE invoice_car DROP FOREIGN KEY FK_DFCC895EC3C6F69F');
        $this->addSql('DROP TABLE invoice_car');
    }
}
