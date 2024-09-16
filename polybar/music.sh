#!/bin/bash

# Check if media is playing
status=$(playerctl status 2>/dev/null)

if [ "$status" != "Playing" ]; then
    exit 0  # Exit without printing anything if not playing
fi

# Get currently playing song info using playerctl
metadata=$(playerctl metadata 2>/dev/null)

if [ -z "$metadata" ]; then
    exit 0  # Exit without printing anything
fi

# Extract relevant information (e.g., artist and title)
artist=$(echo "$metadata" | grep -m 1 "artist" | awk -F 'artist' '{print $2}' | awk '{$1=$1};1')
title=$(echo "$metadata" | grep "title" | awk -F 'title' '{print $2}' | awk '{$1=$1};1')

# Function to trim strings
trim_string() {
    local str="$1"
    local max_length="$2"
    if [ "${#str}" -gt "$max_length" ]; then
        echo "${str:0:max_length}..."
    else
        echo "$str"
    fi
}

# Trim artist and title
artist_trimmed=$(trim_string "$artist" 10)
title_trimmed=$(trim_string "$title" 15)

# Format the output
if [ -n "$artist_trimmed" ] && [ -n "$title_trimmed" ]; then
    echo "%{F#ed858d}$artist_trimmed - %{F#65f083}$title_trimmed%{F-}"
else
    echo ""
fi
