---
title: "Embedded Systems & Firmware Development"
date: 2026-09-20
author: "Priyanshu Shah"
tags: [embedded, firmware, linux, c]
excerpt: "A comprehensive guide into Linux, C Programming, Device Drivers, and Firmware Development."
---

# Embedded Systems & Firmware Development

![Image Placeholder](/blogs/embedded-board.png)

## A) A Background

**1. UNIX, POSIX, Linux, and the ABI/API stack**

In the 1970s, UNIX was created at Bell Labs as a small, elegant OS meant to be built upon, but licensing led to forks (BSD, System V, etc.) and fragmentation. This drove IEEE's POSIX effort in the 1980s to standardize a common API across UNIX-like systems. The GNU project aimed to build a free UNIX replacement but lacked a kernel — Linus Torvalds' 1991 Linux kernel filled that gap, and because it closely follows POSIX, it supports portable UNIX applications and became the heart of modern open-source OSes.

![Linus Torvalds](/blogs/torvalds.png)

*Linus Torvalds : The developer of LINUX*

The Linux kernel manages hardware and processes and exposes system calls (`open`, `read`, `fork`, `exec`, ...) which form the **ABI** (Application Binary Interface — binary-level contract). The **POSIX API** defines a consistent *source-level* interface (`fopen`, `pthread_create`, ...). `libc` (glibc/musl) sits between applications and the kernel, translating POSIX calls into actual syscalls via the correct ABI — enabling portability across hardware and kernel versions as long as the ABI is stable.

**2. Linux Filesystem Principles**

- **Inodes**: every file has an inode storing metadata (size, permissions, timestamps, owner, pointers to data blocks) — *not* the filename.
- **Filename ↔ inode mapping**: directories map names to inode numbers, so multiple names (links) can point to one inode.
- **Blocks**: storage is divided into blocks (512B–4KB); inodes point to these blocks (direct, indirect, double indirect, etc.).
- **Hard links**: a second directory entry pointing to the same inode; data persists until the last link is deleted.
- **Symlinks**: a special file containing a path to another file, with its own inode; can cross filesystems or point to nothing (broken link).
- **Directories**: special files listing filenames → inode numbers, making rename/move fast (just a directory-entry change).
- **Everything is a file**: devices, sockets, pipes, directories all share the file interface.
- **Mounting**: filesystems (ext4, vfat, ntfs, ...) mount into the unified tree at `/`, or subdirectories like `/mnt`, `/home`.
- **Permissions**: inode permission bits + ownership control access via the kernel.
- Filenames are independent of inodes (up to ~255 chars, reusable across dirs).
- Keeping filenames out of inodes enables linking, fast lookups, and inode reuse.
- **Daemon**: an application that runs in the background.

**3. Commands**

| Command | Purpose |
| --- | --- |
| `cp source target` | copy files/dirs (`-r` for directories) |
| `mv source target` | move or rename |
| `rm file` | remove (`-r` dirs, `-f` force) |
| `touch filename` | create empty file / update timestamp |
| `cat file` | print contents; `cat file1 file2` to combine |
| `less file` | page through a file (`q` to quit) |
| `head -n 10 file` | first 10 lines |
| `tail -n 10 file` | last 10 lines |
| `grep "pattern" file` | search pattern (`-r` recursive) |
| `find path -name filename` | search by name |
| `which command` | path of an executable |
| `ps aux` | list running processes |
| `kill PID` | signal a process (`-9` force) |
| `top` / `htop` | live CPU/memory view |
| `df -h` | disk space, human-readable |
| `du -sh folder` | total size of a folder |
| `chmod +x file` | make executable |
| `chown user:group file` | change ownership |
| `tar -czvf archive.tar.gz folder/` | compress |
| `tar -xzvf archive.tar.gz` | extract |
| `scp file user@host:/path` | secure copy to remote |
| `wget URL` | download a file |
| `curl -O URL` | download / send requests |
| `man command` | manual page |
| `sudo command` | run as root |
| `pacman -S/-R/-Ss package` | install / remove / search (Arch) |
| `journalctl -xe` | view system logs |
| `systemctl status/start/stop/restart service` | manage a systemd service |

**Shell operators**

- `|` pipe — send output of one command as input to another, e.g. `ls | grep file`
- `>` redirect (overwrite), `>>` redirect (append)
- `<` redirect input from a file
- `&&` run next only if previous succeeds
- `||` run next only if previous fails

**Paths**

- Relative: `./folder/file.txt`, `../file.txt`
- Absolute: `/home/user/docs`
- `~` home dir, `.` current dir, `..` parent dir

**4. Sysroot & Cross-Compilation**

A sysroot mimics a target device's `/` on the development machine, used during cross-compilation so the compiler knows where to find target headers/libs. Cross-compilation is needed when building for a different architecture than the host (e.g., ARM target, x86 dev machine).

Typical sysroot layout:

```text
sysroot/
├── bin/               # Essential binaries (ls, bash, etc.)
├── boot/              # Boot files (optional in sysroot)
├── dev/               # Device nodes (usually not needed)
├── etc/               # Config files (/etc/resolv.conf, /etc/hostname)
├── home/
│   └── user/
├── lib/               # Core shared libraries (.so)
├── lib64/
├── media/ mnt/        # Mount points
├── opt/               # Optional packages (e.g. TensorRT, OpenCV)
├── proc/              # Kernel interfaces (not needed in sysroot)
├── root/
├── run/ sbin/ srv/ sys/ tmp/
├── usr/
│   ├── bin/ lib/ include/ share/
├── var/
│   ├── log/ tmp/ lib/
└── workspace/
```

Naming conventions: shared libs `libXYZ.so`, `libXYZ.so.1.2`, `libXYZ.a`; headers match lib name (`xyz/xyz.h`); app binaries in `/usr/bin/` or `/opt/my_app/bin/`; optional packages in `/opt/`; configs in `/etc/my_app/`; models/assets in `/opt/my_app/models/` or `/usr/share/my_app`; logs to `/var/log/my_app/`.

Practical example — cross-compiling an OpenCV + TensorRT app for a Jetson Nano:

```text
sysroot/
├── lib/libc.so.6
├── usr/
│   ├── include/opencv4/
│   ├── lib/libopencv_core.so, libtensorrt.so
│   └── bin/smartcam-app
├── etc/smartcam/config.yaml
├── opt/smartcam/
│   ├── models/yolov5.engine
│   └── assets/overlay.png
└── var/log/smartcam.log
```

**5. Static vs Dynamic Linking**

- **Static**: library code is copied into the binary — fast, portable, larger file size.
- **Dynamic**: links to `.so` (shared object) files loaded at runtime — smaller size, needs the `.so` present at runtime.
- Static libs live at `/usr/lib/libxyz.a`; dynamic libs at `/usr/lib/libxyz.so`.

**6. Linux File Extensions**

| Ext | Meaning |
| --- | --- |
| `.sh` | Shell script (Bash/other) |
| `.c` `.cpp` `.h` | C/C++ source/header |
| `.py` | Python script |
| `.out` | Default gcc executable name |
| `.so` | Shared object (dynamic lib, like `.dll`) |
| `.a` | Static library (linked at compile time) |
| `.o` | Object file (pre-link intermediate) |
| `.ko` | Kernel object (kernel module) |
| `.tar` `.tar.gz` `.tgz` | Archives |
| `.gz` `.xz` `.bz2` | Compressed files |
| `.deb` `.rpm` | Package formats (Debian/Red Hat) |
| `.iso` | Disk image |
| `.service` | systemd service file |
| `.desktop` | GUI app shortcut |
| `.conf` | Config file |
| `.log` | Log file |
| `.img` `.bin` `.elf` | Binary/firmware images |
| `.AppImage` | Portable Linux app |
| `.run` | Installer/auto-install script |
| `.md` `.txt` `.rst` | Documentation |

## B) C Programming

> **Important**: shell scripts need a shebang (`#!/bin/bash` or `#!/bin/sh`) as the first line, matching the target shell — emulated QEMU terminals often use `sh`, not `bash`.

**7. Toolchain** = compiler + linker + assembler + tools. E.g. `aarch64-linux-gnu-gcc` bundles gcc/g++, `gdb` (debugger), `ld` (linker), `addr2line`, `objdump` (disassembler), `strip` (remove debug info / compress binary), `readelf`.

**a. Makefile syntax**

```makefile
all: $(TARGET)
$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRC)
clean:
	rm -f $(TARGET) *.o
```

- `CC`: compiler command (`gcc` for x86, `aarch64-linux-gnu-gcc` for ARM)
- `CFLAGS`: `-Wall` (show all warnings), `-Werror` (treat warnings as errors), `-g` (include debug info)
- `TARGET`: output binary name; `SRC`: source files
- `all:` and `clean:` are conventional targets for `make` / `make clean`

**b. Embedded C concepts**

i. Embedded C code has 4 main parts: headers, initialization, main loop, interrupts.

ii. Avoid `int`/`float`/`double` — use fixed-size types (`uint8_t`, `uint16_t`, `int16_t`, ...). Memory is often shown in hex (`0x00`–`0xFF`).

iii. Memory segments:

- Initialized globals → `.data`
- Uninitialized globals → `.bss`
- Local variables (auto) → `.stack`
- `malloc`'d variables → `.heap` (manual alloc/free, avoid unless needed for variable-sized buffers)
- `static` variables → `.data`
- `const` variables → `.rodata`
- Actual code → `.text`

iv. The compiler assumes a variable won't change externally unless declared `volatile` — essential when interrupts, hardware peripherals, or other threads can modify memory, e.g. `volatile int flag = 0;` checked inside `while (flag == 0)`.

v. Hardware registers (GPIO, UART) are memory-mapped:

```c
#define GPIO_REG (*((volatile uint32_t*)0x50000000))
GPIO_REG |= (1 << 5);   // Set bit 5 high (turn on LED)
GPIO_REG &= ~(1 << 5);  // Clear bit 5 (turn off LED)
```

| Operation | Code | Purpose |
| --- | --- | --- |
| Set bit | `x |= (1<<n)` | |
| Clear bit | `x &= ~(1<<n)` | Disable pin/feature |
| Toggle | `x ^= (1<<n)` | Flip LED state |
| Check | `x & (1<<n)` | Read input/flag |

Struct-based peripheral access:

```c
typedef struct {
	volatile uint32_t DATA;
	volatile uint32_t DIR;
	volatile uint32_t MODE;
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef*)0x50000000)

GPIOA->DIR |= (1 << 2);  // Make pin 2 output
GPIOA->DATA |= (1 << 2); // Set pin high
```

vi. Polling a volatile variable wastes CPU cycles, so **interrupts** are used instead — an **ISR** (interrupt service routine) handles a given interrupt, mapped via an interrupt vector table. ISRs can be nested/prioritized so higher-priority interrupts can preempt lower-priority ones.

vii. MCU serial protocols: **UART** (logging, GPS, BT — low speed, 2 wires, RX/TX pins, 8 data bits + 1 stop bit, most common), **SPI** (sensors, flash — high speed, 4+ wires), **I2C** (sensor networks, RTC — medium speed, 2 wires).

```c
USART_CR1 |= (1 << TE);      // Enable transmitter
USART_BRR  = calculated_baud; // Wrong baud rate → garbled data

// Send one character
while (!(USART_SR & TXE));   // Wait for TX buffer empty
USART_DR = 'A';

while (!(USART_SR & RXNE));  // Wait for data to arrive
char c = USART_DR;
```

viii. Bitwise ops: `<<`/`>>` shift left/right. Hex digit = 4 bits, so 2 hex digits = 1 byte.

- Set: `reg = reg | (1 << 0)`
- Clear: `reg = reg & ~(1 << 4)`

## C) File Handling

**8.** `fopen` is buffered I/O (library wrapper, returns a `FILE*`), `open` is a raw syscall (returns an int file descriptor). `fopen` reduces kernel syscalls since buffering happens in userspace.

```c
int fd = open(const char *pathname, int flags, mode_t mode);
read(int fd, void *buf, size_t count);
write(int fd, const void *buf, size_t count);
```

`mode` = user permissions, `flags` = file permissions (e.g. `O_RDWR|O_CREAT`, `S_IRWXU|S_IRWXG|S_IRWXO`). Admins can `umask` to strip permission bits from newly created files. Permissions as numbers: 4=r, 2=w, 1=x (so 6=rw-, 5=r-x) across user/group/others. `umask 0002` strips w from others; `umask 0003` strips wx from others.

**9.** A **FIFO** (named pipe, made with `mkfifo`) is first-in-first-out: one process writes, another reads. If no reader, the writer blocks — unless opened with `O_NONBLOCK`. Pipes use a (typically circular) buffer; if full, the writer waits. `poll()`/`select()` check readiness for read/write on files/sockets/pipes. `EAGAIN` = no data available to read. `strace` traces syscall interaction with the kernel.

**10.** `write()` completing doesn't mean data is on disk — it's in the kernel buffer (risk on unclean shutdown). Use `sync`, `fsync()`, `fdatasync()`, or the `O_SYNC` flag to force writes to disk before success is reported.

`lseek(int fd, off_t offset, int whence)` repositions the file offset:

- `SEEK_SET` — use specified offset
- `SEEK_CUR` — increment/decrement from current
- `SEEK_END` — from EOF

`lseek` moves the shared file position (race-prone with multiple threads); `pread`/`pwrite` avoid this:

```c
pread(int fd, void *buf, size_t count, off_t pos); // doesn't change file position
```

**11.** Reading multiple file descriptors: either spawn a blocking thread per fd, or use non-blocking, multiplexed I/O with a single thread checking all fds via `select()`, `pselect()`, or `poll()`.

## D) Process Handling and Kernel

**12.** The kernel manages processes by PID. Special processes:

- **idle process** (PID 0): power control
- **init process** (PID 1): initializes systems/services/login; all processes descend from it; kernel starts it last in boot. init reads initscripts and launches the rest of the boot sequence.
- `execl()` replaces the current process image with a new one, keeping the same PID/priority/ownership; everything else is replaced. Returns nothing on success.
- `fork()` creates a new child process with a new PID (often used to start daemons); local vars/kernel resources are copy-on-write (only copied when the child actually modifies them).
- If a child exits and the parent never `wait()`s, the child becomes a **zombie**. `wait()` retrieves the child's exit code/reason so the parent can check for errors. A full "new process" flow is `fork()` → `execl()` → `wait()`.
- `system()` does all three, but risks **path injection** (e.g. a compromised `PATH` redirecting `ls` to a malicious binary instead of `/usr/bin/ls`).

**13.** A **tty** is a terminal I/O device. A process group is a set of processes; a session is a set of process groups (created for a login shell on a tty). `&` backgrounds a command. Ctrl-C sends SIGINT only to the foreground process group of a session. `ps` lists processes with CPU/memory/PID/user. A **daemon** is a background process with no controlling terminal, usually run as root, conventionally named ending in `d`, and typically forked from init.

Creating a standard daemon: fork from a child of init → `exit()` in the parent (letting the grandparent/init continue) → `setsid()` (new session, no controlling tty) → `chdir` → close fds → redirect stdin/stdout/stderr to `/dev/null`. Logging frameworks like `syslog` are used instead of terminal output.

**14.** The kernel manages resources, interfaces with hardware, and exposes APIs to userspace, running at the highest CPU privilege level. Entry points are syscalls or hardware interrupts.

Processes live in a circular doubly-linked **task list**, each a `struct task_struct` (`<linux/sched.h>`, ~1.7KB on 32-bit) holding open files, address space, pending signals, state, etc. (On some architectures, e.g. x86, it's embedded within `thread_info` for register/memory handling reasons.)

States: `TASK_RUNNING`, `TASK_INTERRUPTIBLE`, `TASK_UNINTERRUPTIBLE`, `TASK_TRACED`, `TASK_STOPPED` (altered via `set_task_state()`).

Traditional UNIX schedulers use fixed time-slices per process, with priority influenced by a **nice value** (lower nice = higher priority = larger/more frequent slices) — but mapping nice values to absolute time slices can behave inconsistently.

Linux's **Completely Fair Scheduler (CFS)** instead models an "ideal, perfectly multitasking processor," proportionally sharing CPU based on nice-derived weight, and always running the process with the smallest **virtual runtime** next — ensuring fairness and preventing starvation. It uses a **targeted latency** (total time all runnable processes should run in one period), divided among them, with a minimum granularity (~1ms) to bound context-switch overhead.

**15.** **Kconfig** controls kernel configuration, saved to `.config` at the kernel source root. Drivers can be off/on/module (loadable at runtime). A **defconfig** provides an initial `.config` known to work for specific hardware (usually vendor-provided). **Kbuild** compiles driver Makefiles: `obj-y` = built into the kernel, `obj-$(VAR)` = module mode (included via a variable). `-j$(nproc)` parallelizes the build across cores.

Manual kernel build steps: create out dir → clone stable Linux source → build kernel image into outdir → create rootfs skeleton (`bin, dev, etc, home, lib, lib64, proc, sbin, sys, tmp, usr, var`) → build & install busybox → get shared libs and program interpreter → make device nodes → `chown -R root:root *` → create the `cpio.gz` ramdisk.

## E) Threading, Multithreading and Signals

**16.** Analogy: traditional multithreading = many cooks (threads) working dishes (tasks) in parallel — great with enough CPU cores, but too many cooks causes chaos (context-switch overhead) and pot conflicts (**race conditions**) over shared data. Node.js's single-threaded event loop is like one smart chef who starts a task (e.g. dough rising = non-blocking I/O) and moves on, returning on a callback — efficient when most work involves waiting, e.g. web servers, and avoids the overhead of many idle-waiting threads.

A thread is the smallest unit of CPU work (e.g. one request/connection). Exiting a process kills all its threads. Linux only supports **symmetric multiprocessing** (all CPUs share the same RAM) — asymmetric multiprocessing (dedicated RAM per CPU) is much harder to build an OS for.

Unlike Windows, Linux doesn't strongly distinguish threads from processes — each thread gets a normal `task_struct`, differing only in shared file descriptors/memory:

```c
clone(CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND, 0);
```

Kernel threads have a NULL `mm` pointer, can't enter user space, are created only by other kernel threads (often at boot). If a parent exits before its child, the child is reparented to another process in its thread group, or to init.

**17.** A race condition example: an unprotected increment on a shared variable across threads → inconsistent results (not atomic). An **atomic** operation is indivisible and appears instantaneous. To make a sequence atomic, use a **mutex** (mutual exclusion lock) around it.

Other primitives: **semaphores** and **spinlocks**. Mutexes/semaphores put waiting threads to sleep; spinlocks busy-wait, used where sleeping isn't allowed (e.g. interrupt contexts).

- **Mutex**: one thread in a critical section at a time; others sleep.
- **Semaphore**: counter-based, can allow N concurrent accesses; common in producer-consumer problems.
- **Spinlock**: like a mutex but busy-waits instead of sleeping — for low-latency/interrupt contexts.
- Use mutexes for general locking, semaphores for resource counting, spinlocks for fast atomic ops.

**18.** Threads waiting on each other → **deadlock**. Mitigation: lock data (not code), and if multiple locks are needed, always acquire in a consistent order and release in reverse order.

Programs are single-threaded by default; in C use POSIX `pthread_create`. Unjoined threads don't release resources — leaks if left unjoined. In C++, scoped locks auto-lock/unlock via **RAII** (Resource Acquisition Is Initialization).

```c
int pthread_create(pthread_t *thread, const pthread_attr_t *attr,
                    void *(*start_routine)(void *), void *arg);
```

- `thread`: where to store the thread ID (NULL to discard)
- `attr`: stack size / scheduling / detached state (NULL = default)
- `start_routine`: the function to run
- `arg`: argument to that function
- Returns 0 on success (nonzero = failure)

```c
int rc = pthread_create(thread_array[thread], NULL, start, &var);
```

Termination: function returns, `pthread_exit()`, process exits, or `pthread_cancel()` from another thread. `pthread_join()` waits for completion; `pthread_detach()` un-joins a thread.

**19.** Signals are stored/processed by the kernel. `fork()` preserves signal actions; `exec()` resets them.

Default actions: **Term** (terminate via SIGTERM), **Ign** (ignore), **Core** (SIGTERM + core dump), **Stop** (SIGSTOP).

Common signals: `SIGABRT` (assert(), Core), `SIGHUP` (re-read config on the fly), `SIGINT` (Ctrl-C), `SIGKILL` (unconditional, un-ignorable termination), `SIGSEGV` (segfault, Core), `SIGTERM` (graceful termination), `SIGSTOP` (unconditional, un-ignorable stop).

## F) Time

**20. Time types**

i. **Wall time**: real-world time, HW-managed, updated via network protocol

ii. **Process time**: time spent executing that process

iii. **Monotonic time**: system uptime

Absolute time epoch = midnight, Jan 1 1970. The clock updates on ticks/**jiffies** (64-bit counter), at a HW/platform-dependent frequency (typically 100–1000Hz). `time_t` (`<time.h>`) gives seconds since epoch; 32-bit jiffy counters roll over Jan 18 2038. `tm` is the human-readable form. `adjtime` slowly walks the clock backward via a daemon to avoid breaking programs relying on absolute time.

- `sleep()` — seconds; returns seconds *not* slept (due to signal interruption)
- `usleep()` — microseconds; still not signal-precise
- `nanosleep()` — sleep until an absolute time

Sockets can substitute for signals for inter-device TCP/IP communication (including host-forwarding into a QEMU target). Since everything is a file in Linux, sockets are effectively global variables holding a connection's file descriptor.

## G) Device Drivers

**21. OS structure designs**

i. **Monolithic (Linux)**: all apps in user space; VFS, IPC, filesystem, scheduler, VRAM, and drivers all run in kernel space.

ii. **Microkernel (FreeRTOS)**: some OS-level operations run from user level (app IPC, UNIX server, device drivers, file server), while base IPC/VRAM/scheduling stay in kernel space.

iii. **Hybrid kernel (Windows, macOS)**: file server / UNIX server in user space; app IPC, device drivers, and the rest stay in kernel space.

**22.** Device drivers operate hardware through well-defined abstractions, built separately from the kernel and pluggable as needed. Drivers should provide **mechanism, not policy** — e.g. an HDD driver just fetches/stores blocks; a separate program manages the filesystem. A policy-free driver supports async and sync ops, can be opened multiple times, has no extra software layer, and typically ships with a separate user-space program that implements policy.

Kernel responsibilities: create/destroy processes, handle process I/O, schedule processes, build a process's virtual address space, malloc/free memory, maintain the filesystem (ext4, fat, ntfs, ...), device control, networking, applications.

A **driver** is kernel code controlling hardware (may or may not load at runtime). A **module** is kernel code added at runtime — may contain a driver, or extend kernel functionality more generally.

- `insmod` — link a module into the running kernel
- `rmmod` — unlink
- `modprobe` — link including dependency resolution

**23. Device classes**

- **Character**: byte-stream access, open/close/read/write (e.g. `/dev/console`, `/dev/ttyS0`); may or may not support seek/mmap but still looks like a file.
- **Block**: hosts a filesystem, transfers on block boundaries (usually ≥512 bytes) at the device level; Linux manages sub-block access transparently (e.g. `/dev/sda1` as rootfs).
- **Network**: hardware or software (e.g. loopback) devices handling packets, not bytes/blocks; not accessible as a conventional file — named like `eth0` instead, since packet I/O doesn't map well to `read()`/`write()`.

The kernel filesystem layer maps low-level disk blocks to directories/files independent of the transfer mechanism. Drivers typically encode no security policy (exceptions: interrupt lines, harmful-update checks). A driver can only load against the exact kernel it was compiled for — compiler version, target kernel, processor, and config vars must all match.

**24.** Kernel space has no memory-management safety net — always free what you allocate, and a segfault can bring down the whole system. Kernel stack is much smaller than user stack (~4KB vs ~2MB for applications) — size buffers accordingly, and floating point is generally unsupported. Async access needs mutex locks for thread safety.

**25.** Building a module (`hello.c` → `hello.o`):

```makefile
obj-m := hello.o   # Loads our module into the kernel

KERNELDIR ?= /lib/modules/$(shell uname -r)/build
PWD := $(shell pwd)

ifeq ($(KERNELRELEASE),)
# Called from user space — need to invoke the target kernel build
module:
	$(MAKE) -C $(KERNELDIR) M=$(PWD) modules
modules_install:
	$(MAKE) -C $(KERNELDIR) M=$(PWD) modules_install
else
# Called from within the kernel build itself
obj-m := hello.o other_module.o
endif
```

Invoke with: `make -C /path/to/kernel/source M=$(pwd)` (`/lib/modules` lists available kernels; `uname -r` gives the current version).

**26. Makefile variable expansion**

- `A = $(B) world` with `B = hello` → `A` = "hello world" (`=` expands at use time)
- `A := $(B) world` with `B = hello` (set *after*) → `A` = " world" (`:=` expands immediately)
- `C = wow`, `C ?= hello`, `A = $(C) world` → `A` = "wow world" (`?=` sets a default only if unset)

`insmod` loads a `.ko` file after linking against the kernel symbol table; `modprobe` also resolves dependencies (avoiding "unresolved symbols" failures). `lsmod` lists currently loaded modules.

**27.** The `static __init` function should register kernel facilities (devices, fs, sysfs, proc, ...) and initialize data structures — which must live in allocated memory, not the stack (the init stack disappears after `__init` completes, since the module loader drops the init code from memory once loading finishes). The exit function unregisters everything in reverse order and frees allocated memory.

For init failure handling, use `goto` with a dedicated error-handler label per possible failure point:

```c
#include <linux/init.h>
#include <linux/module.h>
MODULE_LICENSE("Dual BSD/GPL");

int __init my_init_func(void) {
	int err;
	err = register_1(ptr1, "wow");
	if (err) goto fail_1;
	err = register_2(ptr2, "dayunm");
	if (err) goto fail_2;
	return 0;

	fail_2: unregister_1(ptr1, "wow");
	fail_1: return err; // propagate the error
}

module_init(my_init_func);
module_exit(my_exit_func);
```

Register/unregister steps depend on the driver type used. Module parameters: `module_param(var, type, permissions)` — e.g. `S_IRUGO` (readable, not changeable), `S_IRUGO | S_IWUSR` (writable by root).

**28.** A **scull** driver is a fake driver for development/learning only (real drivers don't use these):

i. **scull0–scull3**: default devices shared by all processes (standard R/W IO demo)

ii. **scullpipe0–scullpipe3**: FIFO drivers; data written by one process is read by another; supports blocking (waits when empty) and non-blocking (returns immediately when empty) IO

iii. **scullsingle**: only one process can open the device at a time

iv. **sculluid**: each UID gets a private memory region (multiuser isolation)

v. **scullwuid**: like sculluid, but other users can read (not write)

vi. **scullpriv**: each PID gets a private memory region

## H) Character Drivers

**29.** Each device has a major/minor number (`ls -l <driver-path>` to inspect). **Major** maps the kernel to the device file (driver); **minor** distinguishes specific devices handled by that driver.

- `/dev/null` = major 1 (null driver); `/dev/tty0` = major 4 (tty driver)
- Disk devices (sda–sdp) are numbered minor 0, 16, 32 ... up to 240 — e.g. `sda`=0, `sda1`=1, `sda5`=5, `sdb1`=17, etc.

**30.** Registration needs an **fops table** — `file_operations` connects driver operations to a device number, so the kernel locates the driver then the specific operation for a read/write request (OOP-style in C, via structs and pointers).

```c
struct file_operations fops = {
	.owner = THIS_MODULE,
	.read = my_read_func,
	.write = my_write_func,
	.open = my_open_func,
};
```

Other fields: `fmode_t f_mode` (readable/writable), `loff_t f_pos` (current r/w position), `uint f_flags` (`O_RDONLY`, `O_NONBLOCK`, `O_SYNC`), `struct file_operations *f_op`, `void *private_data` (driver-allocated memory pointer).

Unregister:

```c
__unregister_chrdev(major_num, baseminor, count, "driver-name");
// baseminor = first minor occupied; count = number of minors after it
```

Newer registration approach (cdev + fops):

```c
alloc_chrdev_region(&dev_num, 0, 1, "driver-name"); // Allocate device number dev_t
cdev_init(&my_cdev, &fops);                          // Initialize a cdev struct
cdev_add(&my_cdev, dev_num, count);                  // Add cdev to the system
my_class = class_create(THIS_MODULE, "my_class");
device_create(my_class, NULL, dev_num, NULL, "my-device"); // Create /dev entry
```

`dev_num` is a typedef packing major/minor — use `MAJOR(&dev_num)` / `MINOR(&dev_num)` to extract them. `count` = number of consecutive minor numbers buffered for this driver. Adding a `cdev` generates an inode holding permissions, metadata, and a pointer to the `cdev`.

**31.** After registration, `/proc/devices` lists currently allocated devices/drivers, parsed (e.g. via `awk`) to create `/dev` entries with `mknod` — necessary because nodes can't be pre-created under dynamic allocation.

```bash
major=$(awk '$2=="module" {print $1}' /proc/devices)
# Wherever field 2 == module name, print field 1 (the major number)
```

Dynamic device loading steps: `insmod` the module (inits it) → parse `/proc/devices` for the major number → `mknod` with that major number → `chown`/adjust ownership as needed.

**32. Very important — the "everything is a file" model for drivers**

Every file (regular, directory, socket, device) has a `struct inode` with metadata and type. Regular files' inodes point to their data blocks; **driver** inodes instead store the device number (`dev_num`) and a pointer to a `cdev`. The `cdev` bridges kernel and driver — holding driver object files, owner info, and crucially the **fops table** defining `read`/`write`/`open`. So `open("/dev/device")` → kernel checks the inode → sees it's a char device with major/minor N → follows the `cdev` → uses its fops → calls `open`.

Kernel memory:

```c
kmalloc(size_t size, int flags); // allocate, size in bytes
kfree(void *ptr);
```

Kernel debugging via `printk`, tagged with a level (`KERN_EMERG`/`ALERT`/`CRIT`/`ERR`/`WARNING`/`NOTICE`/`INFO`/`DEBUG`, levels 0–7; 1=alert/emerg, 4=warning, 7=debug):

```c
printk(KERN_DEBUG "This var %s", var);
```

**33. Defining open/read/write**

i. **Open method**

- Check for device errors
- Initialize the driver if this is the first open
- Update the f_ops pointer to `file_operations`
- Allocate/set `private_data` to the file's allocated memory
- Connect to the driver's data/params (e.g. a `my_device` struct)
- Signature: `int (*open)(struct inode *, struct file *)`

To get the device struct pointer from the inode:

```c
struct cdev *my_cdev = inode->i_cdev;
struct my_device *dev = container_of(my_cdev, struct my_device, cdev);
// Since our device struct also holds a cdev pointer, container_of uses
// pointer arithmetic to recover the enclosing my_device struct.
```

ii. **Release method** — reverses the open method; deallocates anything allocated into `filp->private_data`.

iii. **Read and write methods** — fetch from / write to the device's buffer:

```c
size_t read(struct file *filep, char __user *buff, size_t count, loff_t *pos);
size_t write(struct file *filep, char __user *buff, size_t count, loff_t *pos);
```

`buff` is a user-space pointer, inaccessible directly from kernel space (MMU memory protection) — hence `copy_to_user()`/`copy_from_user()` (which perform a memcpy across the boundary).

An alternative to structured read/write buffer exchange is **ioctl** — a more flexible device-control interface (locking, ejecting, reporting, etc.), callable only from outside plain user-space reads (e.g. a Python script), though it has fallen out of favor among developers.

**34. Processes and memory layout**

A process is a program in execution. For compiled languages (C, Rust, Go), the program is text (compiled binary/assembly) + data (statics/constants); it becomes a process on execution, gaining a memory layout of text, data, heap, and stack. Two Chrome windows are independent processes sharing the same `.text` (the `chrome.exe` binary) but with separate heap/stack.

Interpreted languages differ: Python/JS don't compile `app.py` to an executable — the interpreter binary occupies `.text`, while the script's code lives in the heap during execution. On launch, text and data go to RAM, with parts of heap/stack cached for speed. The CPU executes the `.text` binary line by line, tracked via a program-counter register.

Example: `LOAD R0 1011` loads register 0 from RAM address 1011; `LOAD R1 1012` similarly; `ADD R1 R0` — encoded in binary as something like `00 01 01 00`, where the first `00` tells the CPU this is an ALU (not memory) operation (via a decoder enabling the ALU vs RAM), the next `01` selects the add circuit (via another decoder), and register values feed into the add circuit to produce the result.

**35. Context switching and scheduling**

For concurrency, the CPU context-switches between processes. Early approaches were cooperative (programs manually yielded via halts) — insecure, since a runaway loop could crash the system. **Pre-emptive** scheduling replaced this: predicting (via nice values) how much time to give a process before forcing an interrupt back to the OS.

On switch, the CPU must save the current process's register state so the outgoing process doesn't see/leak it and can resume correctly later — stored in a **Process Control Block** (PID, state, CPU registers — program counter, general-purpose registers, instruction register, ALU flags, stack pointer, index registers — memory limits, I/O devices, files, parent/child pointers). This PCB sits in the OS's queue for scheduling/preemption. Linux calls this the `task_struct` — the concept is universal even if each OS represents it slightly differently.

**36. Kernel mode vs user mode**

Every architecture has an instruction set; many restrict certain instructions to a privileged ("restricted") mode for safety, tracked via a hardware mode bit — this is the kernel mode / user mode split. An application needing hardware access must make a **system call**, which triggers an interrupt; the OS's interrupt handler runs in kernel mode, which is how a syscall reaches kernel-only instructions.

*(Special thanks to Priyanshu Shah for his amazing handwritten notes that have served as the basis for this page)*
