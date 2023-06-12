#!/usr/bin/env bash

options=("Show" "Start" "Stop")

chosen_option=$(echo -e "${options[@]}" | rofi -sep " " -dmenu -i -selected-row 1 -p "Waydroid: " )

# status=$(waydroid status | grep Session)
#   
# if [[ "$status" == *"STOPPED"* ]]; then
#   notify-send "Starting Waydroid..."
#
#   waydroid session start & disown
#
#   notify-send "Session started successfully! Launching the window..."
#
#   sleep 5
#
#   waydroid show-full-ui
#
# elif [[ "$status" == *"RUNNING"* ]]; then
#   notify-send "Waydroid already running. Launching the window..."
#   waydroid show-full-ui
# else
#   notify-send "Error!\nRun \"waydroid status\" command for more info."
# fi
# echo $status
#
#
