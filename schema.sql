drop table if exists t_website;
create table t_website (
  id integer primary key autoincrement,
  name text not null,
  domain text not null,
  create_at datetime default current_timestamp,
  update_at datetime default current_timestamp
);

drop table if exists t_web_visitor;
create table t_web_visitor (
  id integer primary key autoincrement,
  website_id integer not null,
  url_path text not null,
  referrer_domain text not null,
  referrer_path text not null,
  visitor_ip text not null,
  create_at datetime default current_timestamp,
  update_at datetime default current_timestamp
);
