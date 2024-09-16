#!/bin/bash

# Get GPU utilization using nvidia-smi
gpu_usage=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits)

# Check if nvidia-smi command was successful
if [ $? -ne 0 ]; then
    echo "N/A"  # If nvidia-smi fails, output N/A
    exit 1
fi

# Format output for Polybar
echo "${gpu_usage}"
