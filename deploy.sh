#!/bin/bash

echo "making sure server root mount point exists"
echo "sudo mkdir /mnt/r"
sudo mkdir /mnt/r

echo ""
echo "make sure that server root is mounted"
echo "sudo mount -t drvfs R: /mnt/r"
sudo mount -t drvfs R: /mnt/r

echo ""
echo "removing existing content from folder"
echo "sudo rm -r /mnt/r/status.hetorus.nl/*"
sudo rm -r /mnt/r/status.hetorus.nl/*

echo ""
echo "copying HetorusNL Status Page to the server root"
echo "cp -r build/* /mnt/r/status.hetorus.nl/"
cp -r build/* /mnt/r/status.hetorus.nl/

echo ""
echo "finished deployment of HetorusNL Status Page!"
