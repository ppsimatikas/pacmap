#!/bin/bash -e

yarn build:ui

WALRUS_SITE_ID="0xf49ae17f5df5c6b0be011318bf61ae426ec13b85208bb392e99351c076f98f5a"

#site-builder publish ./ui/dist --ws-resources ./ui/ws-resources.json --epochs 100
site-builder update ./ui/dist $WALRUS_SITE_ID --ws-resources ./ui/ws-resources.json --epochs 100
