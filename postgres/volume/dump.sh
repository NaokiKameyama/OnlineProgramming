#!/bin/sh

echo "start dump"
pg_dump postgres -U admin > /tmp/volume/db.sql
echo "finish dump"
