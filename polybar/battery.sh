#!/bin/bash

timeToDischarge=$(acpi | grep -Po '(\d+:\d+:\d+) remaining' | sed 's/remaining//')
time_left=$(acpi | awk -F ', ' '{print $3}' | awk '{print $1}')
    
if [ -n "$timeToDischarge" ]; then
    hours=$(echo "$timeToDischarge" | awk -F ':' '{print $1}')
    minutes=$(echo "$timeToDischarge" | awk -F ':' '{print $2}')

    if [ "$hours" -gt 0 ]; then
        echo "${hours}h ${minutes}m left"
    else
        echo "${minutes}m left"
    fi
elif [ -n "$time_left" ]; then
    hours=$(echo "$time_left" | awk -F ':' '{print $1}')
    minutes=$(echo "$time_left" | awk -F ':' '{print $2}')
    
    if [ "$hours" -gt 0 ]; then
        echo "${hours}h ${minutes}m till full"
    else
        echo "${minutes}m till full"
    fi
else
    echo "Charging"
fi
