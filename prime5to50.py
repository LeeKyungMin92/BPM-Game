#!usr/bin/python

for i in range(5,51):
    for j in range(2,i):
        if i%j==0: break
        if j==i-1: print(i," is a prime number")
