
#!/bin/sh

echo "🐢 < Start dumping..."
docker exec onlineprogramming_db_1 bash /tmp/volume/dump.sh
echo "🐰 < finish dumping..."