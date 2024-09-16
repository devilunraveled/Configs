#!/bin/bash

# Get the active monitor
active_monitor=$(xrandr --query | grep -E ' connected' | grep -E '\*' | awk '{print $1}')

# Get the focused window ID
focused_window=$(xdotool getactivewindow)

# Get the window geometry
window_geometry=$(xwininfo -id "$focused_window" | grep "Absolute upper-left X")

# Extract the X coordinate of the focused window
x_coordinate=$(echo "$window_geometry" | awk '{print $NF}')

# Get the monitor for the focused window
focused_monitor=$(xrandr --query | grep -E ' connected' | while read -r line; do
    monitor=$(echo "$line" | cut -d' ' -f1)
    geometry=$(echo "$line" | grep -oP '\d+x\d+\+\d+\+\d+')
    x_pos=$(echo "$geometry" | cut -d'+' -f2)
    width=$(echo "$geometry" | cut -d'x' -f1)

    if [[ "$x_coordinate" -ge "$x_pos" && "$x_coordinate" -lt "$((x_pos + width))" ]]; then
        echo "$monitor"
    fi
done)

# Get the window title
window_title=$(xdotool getwindowname "$focused_window")

# Output the title only if it matches the active monitor

echo "Active monitor: $active_monitor"
echo "Focused monitor: $focused_monitor"
echo "Window title: $window_title"

if [[ "$active_monitor" == "$focused_monitor" ]]; then
    echo "$window_title"
else
    echo ""
fi
