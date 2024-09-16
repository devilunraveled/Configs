#!/bin/bash

# Get GPU memory usage using nvidia-smi
gpu_info=$(nvidia-smi --query-gpu=memory.total,memory.used --format=csv,noheader,nounits | tr ',' '.')

# Check if nvidia-smi command was successful
if [ $? -ne 0 ]; then
    echo "N/A"  # If nvidia-smi fails, output N/A
    exit 1
fi

# Extract total and used memory
read -r total used <<< "$gpu_info"

# Calculate percentage usage using bc for floating-point arithmetic
percent=$(echo "scale=0; $used * 100 / $total" | bc)

# Format output for Polybar
echo "${percent}"
