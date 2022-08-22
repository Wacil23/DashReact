<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220810215423 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice CHANGE car_id car_invoice_id INT NOT NULL');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_906517441B567FEC FOREIGN KEY (car_invoice_id) REFERENCES car (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_906517441B567FEC ON invoice (car_invoice_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_906517441B567FEC');
        $this->addSql('DROP INDEX UNIQ_906517441B567FEC ON invoice');
        $this->addSql('ALTER TABLE invoice CHANGE car_invoice_id car_id INT NOT NULL');
    }
}
