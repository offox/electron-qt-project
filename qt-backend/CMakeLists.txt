cmake_minimum_required(VERSION 3.5)
project(QtBackend)

set(CMAKE_CXX_STANDARD 14)

find_package(Qt5Core REQUIRED)

add_executable(QtBackend main.cpp)
target_link_libraries(QtBackend Qt5::Core)

