#!/bin/sh

. "/home/vin/.cache/wal/colors.sh"

conffile="/home/vin/.config/mako/config"

# Associative array, color name -> color code.
declare -A colors
colors=(
    ["background-color"]="${color1}C8"
    ["text-color"]="${foreground}"
    ["border-color"]="${background}EE"
)

for color_name in "${!colors[@]}"; do
  # replace first occurance of each color in config file
  sed -i "0,/^$color_name.*/{s//$color_name=${colors[$color_name]}/}" $conffile
done

makoctl reload
# additionally here you can add some notify-send test notification

notify-send hi
