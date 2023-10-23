import { Migration } from '@mikro-orm/migrations';

export class Migration20231023005037 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `file_registry` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `user_id` int unsigned not null, `hash` varchar(255) not null, `txid` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `file_registry` add index `file_registry_user_id_index`(`user_id`);');

    this.addSql('alter table `file_registry` add constraint `file_registry_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `file_registry`;');
  }

}
