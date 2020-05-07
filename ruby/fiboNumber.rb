num = ARGV[0].to_i;
ARGV.clear()

def fibo(num)
    if(num==0 || num==1)
        return num
    end
    fnm1 = fibo(num-1)
    fnm2 = fibo(num-2)
    fib = fnm1+fnm2
    return fib;
end

puts fibo(num)