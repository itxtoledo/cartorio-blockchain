import { Migration } from '@mikro-orm/migrations';

export class Migration20231022195954 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `password_reset_token` (`id` int unsigned not null auto_increment primary key, `token` varchar(255) not null, `used` tinyint(1) not null default false, `expires_in` datetime not null, `user_id` int unsigned not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `password_reset_token` add index `password_reset_token_user_id_index`(`user_id`);');
    this.addSql('alter table `password_reset_token` add unique `password_reset_token_token_unique`(`token`);');

    this.addSql('alter table `password_reset_token` add constraint `password_reset_token_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `password_reset_token` drop foreign key `password_reset_token_user_id_foreign`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `password_reset_token`;');
  }

}
