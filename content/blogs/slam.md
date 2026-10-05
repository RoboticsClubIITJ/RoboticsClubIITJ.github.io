---
title: "SLAM Knowledge Base"
date: 2026-10-05
author: "Anjaneya Balkrishna Damle, Parv Dixit"
tags: [SLAM, localization, robotics, particle filters, navigation]
excerpt: "A complete guide to SLAM, localization, motion estimation, and mobile robot navigation"
---

## Introduction

SLAM (Simultaneous Localization and Mapping) is the problem of **estimating a robot's position while simultaneously building a map of its environment**. It brings together motion estimation, sensor observations, localization, mapping, scan matching, and loop closure to form a complete robot estimation pipeline.

## What's covered

- Robot anatomy and the mobile robot navigation pipeline
- Differential-drive motion and odometry
- Motion prediction and sensor fusion
- Localization and dead reckoning
- Particle filters and probabilistic localization
- AMCL and map-based localization
- SLAM fundamentals and estimation
- Scan matching and particle-filter-based SLAM
- Graph-based and visual SLAM
- Loop closure and global consistency
- Gmapping, SLAM Toolbox, and Cartographer
- SLAM → localization → navigation pipeline
- ROS-oriented SLAM implementation
- `map → odom → base_link → laser` frame relationship
- Practical SLAM debugging and common failure modes
- Choosing appropriate localization and SLAM approaches
- Worked mobile-robot example
- Key equations, revision tables, and self-test questions

## Resources

### Primary PDFs

- **SLAM — Simultaneous Localization and Mapping — Detailed Study Guide**  
  **PDF:** https://drive.google.com/file/d/1fbmysIrMv7g482F-hN2mpFSPjt3vvkXJ/view

- **SLAM — Introductory / Foundation Guide**  
  **PDF:** https://drive.google.com/file/d/1k2MqRdrUU9hrZJdQLwqP_NWS0XUCJCpz/view

### Visualization & Supporting PDFs

Use the **provided visualization PDFs, slides, diagrams, and other visual material alongside the two primary books**. These resources are intended to make concepts such as **robot motion, LiDAR, coordinate frames, localization, particle filters, map building, SLAM, and navigation** easier to understand visually.

The **two SLAM PDFs are the primary study resources**, while the additional visual material should be used alongside them for intuition and reinforcement.

## Learning Path

**Robot Motion → Odometry → Motion Prediction → Localization → Particle Filters → AMCL → SLAM → Loop Closure → Navigation → ROS Implementation → Debugging**
