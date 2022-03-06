#!/bin/bash
set -e

echo "starting deployment of HetorusNL Status Page"

echo ""
echo "removing existing content from folder"
echo "sudo rm -r /data/caddy-data/status.hetorus.nl/*"
sudo rm -rf /data/caddy-data/status.hetorus.nl/*

echo ""
echo "copying build HetorusNL Status Page to the server root"
echo "cp -r build/* /data/caddy-data/status.hetorus.nl/"
cp -r build/* /data/caddy-data/status.hetorus.nl/

echo ""
echo "finished deployment of HetorusNL Status Page!"