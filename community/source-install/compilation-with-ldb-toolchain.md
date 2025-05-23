---
{
    "title": "Compiling with LDB Toolchain (Recommended)",
    "language": "en"
}
---

<!-- 
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

This guide is about how to compile Doris using the LDB Toolchain. This method serves as a supplement to the Docker compilation approach to help the developers and users without a Docker environment. The recommended LDB Toolchain version is 0.19(Robin), which includes clang-16 and gcc-11.

:::tip
LDB Toolchain is fully known as Linux Distribution Based Toolchain Generator. It helps compile modern C++ projects on almost all Linux distributions.

Special thanks to [Amos Bird](https://github.com/amosbird) for the contribution.
:::

## Prepare the compilation environment

This method applies to most Linux distributions (CentOS, Ubuntu, etc.).

1. **Download** **`ldb_toolchain_gen.sh`**

Download the latest `ldb_toolchain_gen.sh` from [here](https://github.com/amosbird/ldb_toolchain_gen/releases), For ARM architecture, you need to download the latest ldb_toolchain_gen.aarch64.sh. This script is used to generate ldb toolchain.

:::tip
For more information, please visit <https://github.com/amosbird/ldb_toolchain_gen>
:::

2. **Execute the following command to generate ldb toolchain.**

```bash
sh ldb_toolchain_gen.sh /path/to/ldb_toolchain/
```

`/path/to/ldb_toolchain/` is the installation directory for the toolchain. After successful execution, the following directory structure will be generated under `/path/to/ldb_toolchain/`:

```bash
├── bin
├── include
├── lib
├── share
├── test
└── usr
```

3. **Download and install other compilation components**

- Download [Java8](https://doris-thirdparty-1308700295.cos.ap-beijing.myqcloud.com/tools/jdk-8u391-linux-x64.tar.gz) for Doris 2.1 and earlier versions and install it to /path/to/java.

    > For versions later than 3.0 (inclusive), or the master branch, please use [Java 17](https://download.oracle.com/java/17/archive/jdk-17.0.10_linux-x64_bin.tar.gz).

    > It is recommended to install Java 8 or Java 17 using the package management tools provided by your Linux distribution, such as yum(java-1.8.0/17-openjdk-devel) or apt(openjdk-8/17-jdk). and verify with java -version


- Download [Apache Maven 3.9.9](https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz) and install it to /path/to/maven.
- Download [Node v12.13.0](https://doris-thirdparty-repo.bj.bcebos.com/thirdparty/node-v12.13.0-linux-x64.tar.gz) and install it to /path/to/node.
- Different Linux distributions may include different default components. Therefore, you may need to install some additional components. The following takes CentOS 6 as an example. Similar steps may apply to other distributions:

```bash
install required system packages
sudo yum install -y byacc patch automake libtool make which file ncurses-devel gettext-devel unzip bzip2 zip util-linux wget git python2

install autoconf-2.69
wget http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz && \
    tar zxf autoconf-2.69.tar.gz && \
    cd autoconf-2.69 && \
    ./configure && \
    make && \
    make install

install bison-3.8.2
wget http://ftp.gnu.org/gnu/bison/bison-3.8.2.tar.gz && \
    tar xzf bison-3.8.2.tar.gz && \
    cd bison-3.8.2 && \
    ./configure && \
    make && \
    make install
```

4. **Download Doris source code**

```bash
git clone https://github.com/apache/doris.git
```

After downloading, navigate to the Doris source code directory, create a `custom_env.sh` file, and set the PATH environment variable as follows:

```bash
export JAVA_HOME=/path/to/java/
export PATH=$JAVA_HOME/bin:$PATH
export PATH=/path/to/maven/bin:$PATH
export PATH=/path/to/node/bin:$PATH
export PATH=/path/to/ldb_toolchain/bin:$PATH
```

## Compile Doris

:::tip
The first step of compiling Doris source code is to first download third-party libraries and compile them. You can refer to the following instructions to download precompiled versions of the third-party libraries.
:::

1. **Enter the Doris source code directory and execute the following command to check if the compilation machine supports the AVX2 instruction set.**

```bash
cat /proc/cpuinfo | grep avx2
```

2. **Execute compilation.**

```bash
# By default, it builds AVX2 version.
$ sh build.sh

# If you need the no AVX2 version, add USE_AVX2=0.
$ USE_AVX2=0 sh build.sh

# To compile a debug version of BE, add BUILD_TYPE=Debug.
$ BUILD_TYPE=Debug sh build.sh
```

This script first compiles the third-party libraries and then the Doris components (FE, BE, MS). The compilation output can be found in the `output/` directory. MS stands for Meta Service, which a module of Doris in the compute-storage decoupled mode. For more information about MS, refer to this [doc](../../compute-storage-decoupled/compilation-and-deployment).

## Pre-compile third-party libraries

The `build.sh` script compiles third-party libraries first. You can download the pre-compiled third-party libraries directly from the following link:

```Plain
https://github.com/apache/doris-thirdparty/releases
```

The pre-compiled libraries for Linux and MacOS are provided. If they match your compilation and runtime environment, you can download them and use them directly.

After downloading, extract the files to obtain an `installed/` directory. Copy this directory to the `thirdparty/`directory, and then run `build.sh` to proceed with the compilation.
