
#!/bin/bash
set -e

cd /home/ubuntu/app

# Detener la aplicacion anterior
if [ -f /home/ubuntu/app.pid ]; then
    kill "$(cat /home/ubuntu/app.pid)" 2>/dev/null || true
    rm -f /home/ubuntu/app.pid
fi

# Iniciar la nueva version
nohup node app.js > /home/ubuntu/app.log 2>&1 &
echo $! > /home/ubuntu/app.pid

echo "Andina Market iniciado correctamente"
