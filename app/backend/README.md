docker run --name mysql-ansible -e MYSQL_ROOT_PASSWORD=docker-ansible -e MYSQL_DATABASE=shopping-list -p 3306:3306 -d mysql:latest
