<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220813004459 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE car ADD invoice_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D2989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_773DE69D2989F1FD ON car (invoice_id)');
        $this->addSql('ALTER TABLE customer ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_81398E09A76ED395 ON customer (user_id)');
        $this->addSql('ALTER TABLE invoice ADD car_id INT DEFAULT NULL, ADD chrono INT NOT NULL');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_90651744C3C6F69F ON invoice (car_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09A76ED395');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP INDEX IDX_81398E09A76ED395 ON customer');
        $this->addSql('ALTER TABLE customer DROP user_id');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D2989F1FD');
        $this->addSql('DROP INDEX UNIQ_773DE69D2989F1FD ON car');
        $this->addSql('ALTER TABLE car DROP invoice_id');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744C3C6F69F');
        $this->addSql('DROP INDEX UNIQ_90651744C3C6F69F ON invoice');
        $this->addSql('ALTER TABLE invoice DROP car_id, DROP chrono');
    }
}
