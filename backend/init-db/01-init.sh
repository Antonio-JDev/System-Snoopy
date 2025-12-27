#!/bin/bash
set -e

# Configurar pg_hba.conf para aceitar conexões TCP com md5
echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
echo "host all all ::/0 md5" >> /var/lib/postgresql/data/pg_hba.conf

# Recarregar configuração do PostgreSQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    SELECT pg_reload_conf();
EOSQL

echo "Configuração de autenticação atualizada!"
