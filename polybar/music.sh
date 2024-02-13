
#!/bin/bash

# Get currently playing song info using playerctl
metadata=$(playerctl metadata 2>/dev/null)

if [ -z "$metadata" ]; then
    exit 0  # Exit without printing anything
fi
# Extract relevant information (e.g., artist and title)
artist=$(echo "$metadata" | grep -m 1 "artist" | awk -F 'artist' '{print $2}' | awk '{$1=$1};1')
title=$(echo "$metadata" | grep "title" | awk -F 'title' '{print $2}' | awk '{$1=$1};1')

# Format the output
if [ -n "$artist" ] && [ -n "$title" ]; then
    echo  "%{F#ed858d}$artist - %{F#65f083}$title%{F-}"
else
    echo ""
fi
