---
title: "ROS/ROS2 Knowledge Base"
date: 2026-10-05
author: "Parv Dixit, Sai Girish"
tags: [ROS 2, robotics, SLAM, navigation, ROS 2 control]
excerpt: "A complete guide to ROS 2, SLAM, localization, and mobile robot navigation"
---

## Introduction

The software and estimation foundations that tie a mobile robot together — from **ROS 2 communication and robot software architecture** to **motion estimation, localization, SLAM, and navigation**. These resources combine conceptual understanding with practical implementation and visualization.

## What's covered

### ROS 2

- ROS fundamentals and the ROS computational graph
- ROS 1 vs ROS 2, DDS, RMW, discovery, and QoS
- Nodes, topics, services, actions, parameters, and interfaces
- ROS 2 packages, workspaces, `ament`, `colcon`, launch, CLI, and `ros2 bag`
- `tf2` and coordinate frames
- URDF, Xacro, SDF, and Gazebo simulation
- Nav2 and navigation workflows
- MoveIt 2 and manipulation
- `ros2_control`, hardware interfaces, and controllers
- Executors, callback groups, testing, tracing, diagnostics, and debugging

### SLAM & Localization

- Differential-drive motion and odometry
- Motion prediction and sensor fusion
- Localization and dead reckoning
- Particle filters and AMCL
- SLAM fundamentals and estimation
- Scan matching and graph-based SLAM
- Loop closure and global consistency
- Gmapping, SLAM Toolbox, and Cartographer
- SLAM → localization → navigation pipeline
- ROS-oriented SLAM implementation and debugging
- Common SLAM failure modes and troubleshooting

## Resources

### Primary PDFs

- **ROS 2 Complete Study Guide — Beginner to Advanced**  
  **PDF:** https://drive.google.com/file/d/1VNm-n5b5DFvB-qNgu7yhDum5WEJrqQlh/view

- **SLAM — Simultaneous Localization and Mapping — Detailed Study Guide**  
  **PDF:** https://drive.google.com/file/d/1zPugjz9NwfbnbtRGrHGBDRAzQSfYSdGR/view

### Visualization & Supporting PDFs

- **ROS 2 Introductory Slides** — use alongside the ROS 2 study guide for visual explanations and an introduction to the core concepts.
- **SLAM Visualization / Supporting PDFs** — use alongside the SLAM study guide to better understand robot motion, LiDAR, localization, mapping, SLAM, and navigation.

The **two study guides are the primary references**. The additional PDFs, slides, diagrams, and visualization material should be used alongside them to reinforce the concepts visually and practically.

## Learning Path

**ROS 2 Fundamentals → tf2 & Robot Description → Simulation → Motion & Odometry → Localization → SLAM → AMCL → Nav2 → Hardware Integration**
