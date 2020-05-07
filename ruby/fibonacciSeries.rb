f1 = 0
f2 = 1
num = ARGV[0].to_i;
ARGV.clear()
 for i in (0..num-1)
    puts f1.to_s();
    f3 = f1 + f2
    f1 = f2
    f2 = f3
 end
