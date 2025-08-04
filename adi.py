#print('Hello World')
stdn = input ('Enter the name of the student: ')
usn = input('Enetr the USN of the student: ')
m1 = int(input('Marks in subject 1: '))
m2 = int(input('Marks in Sub2 :'))
m3 = int(input('Marks in sub3: '))
total = m1+m2+m3
perc = int((total/300)*100)

print ('Name: ',stdn)
print ('USN: ',usn)
print ('Sub1:',m1)
print ('Sub2: ',m2)
print ('SUb3: ', m3)
print ('Total: ',total)
print ('Percentage:', perc)

if perc>=90:
    print ('First class ex')
elif perc>=75: 
    print('First class dis')
elif perc>=60:
    print('First class')
elif perc>=35: 
    print('Second class')
else:
    print('pass')
    
print("Hellooo ")