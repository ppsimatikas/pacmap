#!/bin/bash -e

ENV=mainnet
#SYSTEM=macos-arm64

#curl https://storage.googleapis.com/mysten-walrus-binaries/site-builder-mainnet-latest-$SYSTEM -o site-builder
#chmod +x site-builder
#sudo mv ./site-builder /usr/local/bin/site-builder
#
#curl https://raw.githubusercontent.com/MystenLabs/walrus-sites/refs/heads/mainnet/sites-config.yaml -o ./sites-config.yaml
#curl https://docs.wal.app/setup/client_config.yaml -o ~/.config/walrus/client_config.yaml

#yarn build:ui
#
WALRUS_SITE_ID="0x74a2d14a6e13aa7fd7942bdd1320bb7a5bcec517275bf5478445f84ec12523a7"

# Get testnet WAL from here (Get WAL): https://stake-wal.wal.app/?network=testnet
site-builder --context $ENV --config ./sites-config.yaml publish ./ui/dist --ws-resources ./ui/ws-resources.json --site-name "pacmap" --epochs 53
#site-builder --context $ENV --config ./sites-config.yaml update ./ui/dist $WALRUS_SITE_ID --ws-resources ./ui/ws-resources.json --epochs 53

#site-builder publish ./ui/dist --ws-resources ./ui/ws-resources.json --epochs 100
##site-builder update ./ui/dist $WALRUS_SITE_ID --ws-resources ./ui/ws-resources.json --epochs 100