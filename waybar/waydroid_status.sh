#!/bin/bash

waydroid_output=$(waydroid status | grep Session)

if [[ "$waydroid_output" == *"STOPPED"* ]]; then
  waydroid_running="Stopped"
elif [[ "$waydroid_output" == *"RUNNING"* ]]; then
  waydroid_running="Running"
fi

echo "$waydroid_running"

