# Test Doubles

1. Dummy - passed around but not used
2. Fake - simplified working implementation, take a shortcut
3. Stubs - incomplete objects used as arguments
4. Spies - track information about how a unit is called
5. Mocks - preprogrammed with expectations

# Naming conventions

1. sut - System Under Test

# STYLES

1. Chicago - small focus on mocks
   a. unit: collection of pieces
   b. test from a broader view
   c. little use of mocks
2. London - heavy mocks use
   a. unit: a class
   -mock all its dependencies
